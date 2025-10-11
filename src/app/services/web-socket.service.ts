import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket?: WebSocket;
  private messages$ = new Subject<any>(); // 👈 aquí guardamos los mensajes entrantes

  constructor(private auth: AuthService, private zone: NgZone) {}

  async connect(): Promise<void> {
    const token = await this.auth.getAccessTokenSilently().toPromise();

    if (!token) {
      console.error('No hay token disponible');
      return;
    }

    this.socket = new WebSocket(
      `ws://localhost:4100/api/GetAllOrdersActives?token=${token}`
    );

    this.socket.onopen = () => console.log('✅ WebSocket conectado');
    this.socket.onclose = () => console.log('❌ WebSocket cerrado');
    this.socket.onerror = (err) => console.error('⚠️ Error en WebSocket:', err);

    this.socket.onmessage = (event) => {
      // Angular necesita run() para detectar cambios fuera de su zona
      this.zone.run(() => {
        try {
          const data = JSON.parse(event.data);
          this.messages$.next(data); // 🚀 Emitir el mensaje entrante
        } catch {
          this.messages$.next(event.data); // si no es JSON, emitir crudo
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
