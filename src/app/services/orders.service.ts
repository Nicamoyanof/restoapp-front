import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly http: HttpClient) {}

  getOrders() {
    return this.http.get('/api/Order');
  }
  getOrdersActives() {
    return this.http.get('/api/Order/Actives');
  }
  createOrder(orderData: any) {
    return this.http.post('/api/Order', orderData);
  }
  updateOrder(id: number, orderData: any) {
    return this.http.put(`/api/Order/${id}`, orderData);
  }
  deleteOrder(id: number) {
    return this.http.delete(`/api/Order/${id}`);
  }
  getOrderById(id: number) {
    return this.http.get(`/api/Order/${id}`);
  }
  getOrdersByTableId(tableId: number) {
    return this.http.get(`/api/tables/${tableId}/Orders`);
  }
  addItemToOrder(orderId: number, itemData: any) {
    return this.http.post(`/api/Order/${orderId}/Items`, itemData);
  }
  removeItemFromOrder(orderId: number, itemId: number) {
    return this.http.delete(`/api/Order/${orderId}/Items/${itemId}`);
  }
  updateItemInOrder(orderId: number, itemId: number, itemData: any) {
    return this.http.put(
      `/api/Order/${orderId}/Items/${itemId}/Quantity`,
      itemData
    );
  }
  getItemsByOrderId(orderId: number) {
    return this.http.get(`/api/Order/${orderId}/Items`);
  }
  completeOrder(orderId: number) {
    return this.http.post(`/api/Order/${orderId}/complete`, {});
  }
  cancelOrder(orderId: number) {
    return this.http.post(`/api/Order/${orderId}/cancel`, {});
  }
  getOrderStatusCounts() {
    return this.http.get('/api/Order/status-counts');
  }
  getOrdersByStatus(status: string) {
    return this.http.get(`/api/Order?status=${status}`);
  }
  searchOrders(query: string) {
    return this.http.get(`/api/Order/search?query=${query}`);
  }
  getRecentOrders() {
    return this.http.get('/api/Order/recent');
  }
  getOrderHistory(customerId: number) {
    return this.http.get(`/api/customers/${customerId}/Orders`);
  }

  markPreparingItemFromOrder(orderId: number, itemId: number) {
    return this.http.post(
      `/api/Order/${orderId}/Items/${itemId}/Preparing`,
      {}
    );
  }
  //ready
  markReadyItemFromOrder(orderId: number, itemId: number) {
    return this.http.post(`/api/Order/${orderId}/Items/${itemId}/Ready`, {});
  }

  closeOrder(orderId: number, paymentData: any) {
    return this.http.post(`/api/Order/${orderId}/Close`, paymentData);
  }

  print(orderId: number) {
    return this.http.get(`/api/Order/Print`, {
      params: {
        orderId: orderId,
      },
    });
  }

  changePaymentMethod(orderId: number, paymentMethodId: number) {
    return this.http.put(`/api/Order/ChangePaymentMethod`, {
      orderId: orderId,
      paymentMethod: paymentMethodId,
    });
  }
}
