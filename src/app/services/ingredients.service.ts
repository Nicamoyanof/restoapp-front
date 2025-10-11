import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get('/api/Ingredients/Categories');
  }

  createIngredient(ingredient: any) {
    return this.http.post('/api/Ingredients', ingredient);
  }

  getIngredients() {
    return this.http.get('/api/Ingredients');
  }

  updateIngredient(id: string, ingredient: any) {
    return this.http.put(`/api/Ingredients/${id}`, ingredient);
  }

  deleteIngredient(id: string) {
    return this.http.delete(`/api/Ingredients/${id}`);
  }

  getIngredientById(id: string) {
    return this.http.get(`/api/Ingredients/${id}`);
  }
}
