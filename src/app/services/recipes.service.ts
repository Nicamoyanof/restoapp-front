import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get('/api/recipes');
  }

  getRecipeById(id: number) {
    return this.http.get(`/api/recipes/${id}`);
  }

  createRecipe(data: any, productId: number) {
    return this.http.post(`/api/Recipes/${productId}`, data);
  }

  getRecipeByProductId(productId: any) {
    return this.http.get(`/api/Recipes/${productId}`);
  }
}
