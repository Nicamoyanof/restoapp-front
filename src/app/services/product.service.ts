import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get('/api/Product');
  }

  getProductById(id: any) {
    return this.http.get(`/api/Product/${id}`);
  }

  createProduct(product: any) {
    return this.http.post('/api/Product', product);
  }

  updateProduct(id: any, product: any) {
    return this.http.put(`/api/Product/${id}`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`/api/Product/${id}`);
  }
}
