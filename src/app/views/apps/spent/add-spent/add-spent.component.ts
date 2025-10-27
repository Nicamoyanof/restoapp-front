import { BaseUnitEnum } from '@common/base-units';
import { IngredientsService } from '@/app/services/ingredients.service';
import { ProductService } from '@/app/services/product.service';
import { StockMovementService } from '@/app/services/stock-movement.service';
import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-spent',
  imports: [
    RouterLink,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    SelectFormInputDirective,
    CommonModule,
  ],
  templateUrl: './add-spent.component.html',
  styleUrl: './add-spent.component.scss',
})
export class AddSpentComponent implements OnInit {
  isEdit: boolean = false;
  formGroup: any;
  products: any[] = [];
  ingredients: any[] = [];
  resetEmitter = new EventEmitter<string>();
  baseUnits = BaseUnitEnum;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private ingredientService: IngredientsService,
    private stockMovementService: StockMovementService
  ) {
    // Initialize formGroup here if needed
    this.formGroup = fb.group({
      itemId: [0],
      quantity: [0],
      totalCost: [0],
      // supplierId: [0],
      // purchaseId: [0],
      isProduct: [null],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadIngredients();
  }
  loadProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.filter((p: any) => !p.hasRecipe);
      this.resetEmitter.emit('product');
    });
  }
  loadIngredients() {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      this.ingredients = data;
      this.resetEmitter.emit('ingredient');
    });
  }

  save() {
    if (this.formGroup.valid) {
      const movement = {
        itemId: this.formGroup.value.itemId,
        quantity: this.formGroup.value.quantity,
        totalCost: this.formGroup.value.totalCost,
        isProduct: this.formGroup.value.isProduct,
        note: this.formGroup.value.note,
      };
      this.stockMovementService.addStockMovement(movement).subscribe({
        next: (res) => {
          //swal en español
          Swal.fire({
            title: 'Éxito',
            text: 'Movimiento de stock agregado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            //recargar la pagina
            this.formGroup.reset();
            this.resetEmitter.emit('all');
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al agregar movimiento de stock',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }

  getBaseUnitNameById(): string {
    if (this.formGroup.value.isProduct) return this.baseUnits[2].name; // 'Unidad' for products
    const unitId = [...this.ingredients].find(
      (ing) => ing.id == this.formGroup.value.itemId
    )?.baseUnitId;
    const unit = this.baseUnits.find((u) => u.id === unitId);
    return unit ? unit.abbreviation.toUpperCase() + '.' : 'U.';
  }
}
