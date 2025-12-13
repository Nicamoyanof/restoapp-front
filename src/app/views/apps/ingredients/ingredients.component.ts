import { IngredientsService } from '@/app/services/ingredients.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingredients',
  imports: [
    CommonModule,
    RouterLink,
    NgbPagination,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent implements OnInit {
  ingredients: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 10;
  maxSize: number = Math.ceil(this.totalItems / this.pageSize);
  formGroup: any;

  constructor(
    private ingredientService: IngredientsService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      category: [''],
    });
  }
  ngOnInit(): void {
    this.loadIngredients();
    this.formGroup.valueChanges.subscribe((values: any) => {
      this.filterIngredients(values);
    });
  }
  filterIngredients(values: any): void {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      let filteredData = data;
      if (values.name) {
        filteredData = filteredData.filter((item: any) =>
          item.name.toLowerCase().includes(values.name.toLowerCase())
        );
      }
      if (values.category) {
        filteredData = filteredData.filter((item: any) =>
          item.category.toLowerCase().includes(values.category.toLowerCase())
        );
      }
      this.ingredients = filteredData;
      this.totalItems = filteredData.length;
      this.currentPage = 1;
    });
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      this.ingredients = data;
      this.totalItems = data.length;
    });
  }

  delete(ingredientId: any): void {
    //agregar Swal para vlaidar la eliminacion
    Swal.fire({
      title: 'Estás seguro de eliminar este ingrediente?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ingredientService.deleteIngredient(ingredientId).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'Tu ingrediente ha sido eliminado.',
            'success'
          );
          this.loadIngredients();
        });
      }
    });
  }
}
