import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

import {
  getPendingReady,
  OfflineRequest,
  putRequest,
  updateRequest,
  deleteRequest,
} from '../helper/offline-queue.db';

function uuid(): string {
  return (
    crypto.randomUUID?.() ?? (Date.now() + '-' + Math.random()).replace('.', '')
  );
}

function backoffMs(retry: number): number {
  const seq = [1000, 5000, 15000, 30000, 60000, 300000];
  return seq[Math.min(retry, seq.length - 1)];
}

@Injectable({ providedIn: 'root' })
export class OfflineQueueService {
  private syncing = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  async enqueue(
    req: Omit<
      OfflineRequest,
      'id' | 'createdAt' | 'retryCount' | 'nextRetryAt' | 'status'
    >
  ) {
    const item: OfflineRequest = {
      id: uuid(),
      createdAt: Date.now(),
      retryCount: 0,
      nextRetryAt: Date.now(),
      status: 'PENDING',
      ...req,
    };

    await putRequest(item);
    return item.id;
  }

  async processQueue() {
    if (this.syncing) return;
    if (!navigator.onLine) return;

    this.syncing = true;

    try {
      const items = await getPendingReady(Date.now());
      console.log('Processing offline queue...', items);

      for (const item of items) {
        // lock por item
        await updateRequest(item.id, { status: 'SENDING' });

        try {
          // token fresco (NO lo guardes en IndexedDB)
          const token = await firstValueFrom(
            this.auth.getAccessTokenSilently()
          );

          const headers = new HttpHeaders({
            ...item.headers,
            Authorization: `Bearer ${token}`,
            'Idempotency-Key': item.id,
          });

          await firstValueFrom(
            this.http.request(item.method, item.url, {
              body: item.body,
              headers,
              observe: 'response',
            })
          );

          // OK -> eliminamos de la cola
          await deleteRequest(item.id);
        } catch (err: any) {
          const retryCount = (item.retryCount ?? 0) + 1;
          const nextRetryAt = Date.now() + backoffMs(retryCount);

          const status = err?.status;
          const msg =
            err?.error?.message ??
            err?.message ??
            (typeof err === 'string' ? err : JSON.stringify(err));

          // 4xx no reintentable (excepto 408 / 429)
          const nonRetryable =
            status >= 400 && status < 500 && status !== 408 && status !== 429;

          await updateRequest(item.id, {
            status: nonRetryable ? 'FAILED' : 'PENDING',
            retryCount,
            nextRetryAt: nonRetryable ? Number.MAX_SAFE_INTEGER : nextRetryAt,
            lastError: msg,
          });
        }
      }
    } finally {
      this.syncing = false;
    }
  }
}
