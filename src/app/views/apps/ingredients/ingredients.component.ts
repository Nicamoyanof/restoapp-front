import { IngredientsService } from '@/app/services/ingredients.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ingredients',
  imports: [CommonModule, RouterLink, NgbPagination],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent implements OnInit {
  ingredients: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 10;
  maxSize: number = Math.ceil(this.totalItems / this.pageSize);

  constructor(private ingredientService: IngredientsService) {}
  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      this.ingredients = data;
      this.totalItems = data.length;
    });
  }

  delete(ingredientId: number): void {}
}
