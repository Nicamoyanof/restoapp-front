import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  constructor(private http: HttpClient) {}

  getPaymentMethods() {
    return this.http.get('/api/PaymentMethod');
  }
  addPaymentMethod(data: any) {
    return this.http.post('/api/PaymentMethod', data);
  }
  updatePaymentMethod(id: string, data: any) {
    return this.http.put(`/api/PaymentMethod/${id}`, data);
  }
  deletePaymentMethod(id: string) {
    return this.http.delete(`/api/PaymentMethod/${id}`);
  }
}
