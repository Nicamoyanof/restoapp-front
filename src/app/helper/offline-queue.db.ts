export type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface OfflineRequest {
  id: string; // UUID
  url: string;
  method: HttpMethod;
  body: any;
  headers: Record<string, string>;
  createdAt: number;
  retryCount: number;
  nextRetryAt: number; // epoch ms
  status: 'PENDING' | 'SENDING' | 'SENT' | 'FAILED';
  lastError?: string;
}

const DB_NAME = 'offline_queue_db';
const STORE = 'requests';
const VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('nextRetryAt', 'nextRetryAt', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function putRequest(item: OfflineRequest): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function getPendingReady(
  now = Date.now()
): Promise<OfflineRequest[]> {
  const db = await openDb();
  const items = await new Promise<OfflineRequest[]>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const out: OfflineRequest[] = [];
    const req = store.openCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (!cursor) return;
      const value = cursor.value as OfflineRequest;
      if (
        (value.status === 'PENDING' || value.status === 'FAILED') &&
        value.nextRetryAt <= now
      ) {
        out.push(value);
      }
      cursor.continue();
    };
    tx.oncomplete = () =>
      resolve(out.sort((a, b) => a.createdAt - b.createdAt));
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  return items;
}

export async function updateRequest(
  id: string,
  patch: Partial<OfflineRequest>
): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const current = getReq.result as OfflineRequest | undefined;
      if (!current) return resolve();
      store.put({ ...current, ...patch });
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function deleteRequest(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}
