import { IngredientsService } from '@/app/services/ingredients.service';
import { ProductService } from '@/app/services/product.service';
import { StockMovementService } from '@/app/services/stock-movement.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BaseUnitEnum } from '@common/base-units';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-count-stock',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SelectFormInputDirective,
    RouterLink,
    NgbAccordionModule,
  ],
  templateUrl: './count-stock.component.html',
  styleUrl: './count-stock.component.scss',
})
export class CountStockComponent implements OnInit {
  formGroup: any;
  products: any[] = [];
  ingredients: any[] = [];
  resetEmitter: any = new EventEmitter<void>();
  baseUnits = BaseUnitEnum;

  constructor(
    private productService: ProductService,
    private ingredientService: IngredientsService,
    private fb: FormBuilder,
    private stockMovementService: StockMovementService
  ) {
    this.formGroup = fb.group({
      itemId: [0],
      quantity: [0],
      isProduct: [null],
      reason: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadIngredients();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  loadIngredients() {
    this.ingredientService.getCategories().subscribe((data: any) => {
      this.ingredients = data;
    });
  }

  getBaseUnitNameById(): string {
    if (this.formGroup.value.isProduct)
      return this.baseUnits[2].abbreviation + '.'; // 'Unidad' for products
    const unitId = [...this.ingredients].find(
      (ing) => ing.id == this.formGroup.value.itemId
    )?.baseUnitId;
    const unit = this.baseUnits.find((u) => u.id === unitId);
    return unit ? unit.abbreviation + '.' : 'U.';
  }

  save() {
    if (this.formGroup.valid) {
      // swal
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas guardar este conteo de stock?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.stockMovementService
            .adjustmentStock(this.formGroup.value)
            .subscribe(() => {
              Swal.fire(
                'Guardado!',
                'El conteo de stock ha sido guardado.',
                'success'
              ).then(() => {
                this.formGroup.reset();
                this.resetEmitter.emit('all');
              });
            });
        }
      });
    }
  }
}
