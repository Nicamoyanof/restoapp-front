import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly clientSubject = new BehaviorSubject<any | null>(null);
  readonly client$ = this.clientSubject.asObservable();

  constructor(private http: HttpClient) {}

  getClient() {
    //validate if client is in local storage
    const client = localStorage.getItem('client');
    if (client) {
      this.clientSubject.next(JSON.parse(client));
      return;
    }

    this.http.get('/api/Client').subscribe({
      next: (c) => {
        this.clientSubject.next(c);
        localStorage.setItem('client', JSON.stringify(c));
      },
      error: () => this.clientSubject.next(null),
    });
  }

  getClientId() {
    return this.clientSubject.value?.clientId;
  }

  updateStoreName(name: string, clientId: string) {
    let body = {
      name: name,
      clientId: clientId,
      logo: '',
      isActive: true,
    };

    return this.http.put(`/api/Client/${clientId}`, body);
  }

  clearClient() {
    this.clientSubject.next(null);
  }

  createClient(name: string) {
    return this.http.post('/api/Client', { name });
  }
}
