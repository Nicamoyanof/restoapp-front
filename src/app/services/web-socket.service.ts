import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket?: WebSocket;
  private messages$ = new ReplaySubject<any>(1); // guarda el último mensaje
  isConnected = false;

  constructor(private auth: AuthService, private zone: NgZone) {}

  async connect(): Promise<void> {
    if (this.isConnected && this.socket?.readyState === WebSocket.OPEN) {
      console.log('🔗 WebSocket ya conectado, no se reconecta');
      return;
    }

    const token = await this.auth.getAccessTokenSilently().toPromise();
    if (!token) {
      console.error('No hay token disponible');
      return;
    }

    this.socket = new WebSocket(
      `ws://localhost:4100/api/GetAllOrdersActives?token=${token}`
    );

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('✅ WebSocket conectado');
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      console.warn('❌ WebSocket cerrado, reintentando...');
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (err) => console.error('⚠️ Error en WebSocket:', err);

    this.socket.onmessage = (event) => {
      this.zone.run(() => {
        try {
          const data = JSON.parse(event.data);
          this.messages$.next(data);
        } catch {
          this.messages$.next(event.data);
        }
      });
    };
  }

  /** Observable para suscribirse a los mensajes entrantes */
  get messages(): Observable<any> {
    return this.messages$.asObservable();
  }

  /** Enviar mensaje al WS */
  sendMessage(message: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  /** Cerrar la conexión */
  close(): void {
    this.socket?.close();
    this.messages$.complete();
  }
}
