import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryProductService {
  constructor(private http: HttpClient) {}

  createCategoryProduct(data: any) {
    return this.http.post('/api/CategoryProduct', data);
  }
  getCategoryProducts() {
    return this.http.get('/api/CategoryProduct');
  }

  getCategoryProductById(id: string) {
    return this.http.get(`/api/CategoryProduct/${id}`);
  }

  updateCategoryProduct(id: string | null, data: any) {
    return this.http.put(`/api/CategoryProduct/${id}`, data);
  }

  deleteCategoryProduct(id: string | null) {
    return this.http.delete(`/api/CategoryProduct/${id}`);
  }
}
