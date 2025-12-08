import { BaseUnitEnum } from '@common/base-units';
import { StockMovementService } from '@/app/services/stock-movement.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovementType } from '@common/movement-type.enum';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientsService } from '@/app/services/ingredients.service';
import { CategoryProductService } from '@/app/services/category-product.service';
import { ProductService } from '@/app/services/product.service';

@Component({
  selector: 'app-control-stock',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './control-stock.component.html',
  styleUrl: './control-stock.component.scss',
})
export class ControlStockComponent implements OnInit {
  products: any[] = [];
  ingredients: any[] = [];
  baseUnit = BaseUnitEnum;
  formGroup: any;
  categoryProducts: any[] = [];
  categoryIngredients: any[] = [];
  productsFiltered: any[] = [];
  allProducts: any[] = [];
  ingredientsFiltered: any[] = [];
  allIngredients: any[] = [];

  constructor(
    private stockMovementService: StockMovementService,
    private fb: FormBuilder,
    private ingredientService: IngredientsService,
    private categoryProductService: CategoryProductService,
    private productService: ProductService
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      categoryProduct: ['all'],
      categoryIngredient: ['all'],
      showAllStock: [false],
    });
  }

  ngOnInit(): void {
    this.loadStockMovements();
    this.loadCategoryProducts();
    this.loadCategoryIngredients();
    this.loadProductsFilter();
    this.formGroup.valueChanges.subscribe((values: any) => {
      this.productsFiltered = [...this.products];
      this.ingredientsFiltered = [...this.ingredients];
      if (values.name) {
        this.productsFiltered = this.productsFiltered.filter((product: any) =>
          product.name
            .toLowerCase()
            .includes(values.name.toString().toLowerCase())
        );
        this.ingredientsFiltered = this.ingredientsFiltered.filter(
          (ingredient: any) =>
            ingredient.name
              .toLowerCase()
              .includes(values.name.toString().toLowerCase())
        );
      }
      if (values.categoryProduct) {
        if (values.categoryProduct == 'all') {
          this.productsFiltered = this.productsFiltered;
        } else {
          const auxProd = [...this.allProducts].filter(
            (product: any) => product.categoryId == values.categoryProduct
          );
          this.productsFiltered = this.productsFiltered.filter((product: any) =>
            auxProd.some((p: any) => p.productId == product.id)
          );
        }
      }
      if (values.categoryIngredient != '') {
        if (values.categoryIngredient == 'all') {
          this.ingredientsFiltered = this.ingredientsFiltered;
          return;
        } else {
          const auxIng = [...this.allIngredients].filter(
            (ingredient: any) =>
              ingredient.category == values.categoryIngredient
          );
          this.ingredientsFiltered = this.ingredientsFiltered.filter(
            (ingredient: any) => auxIng.some((i: any) => i.id == ingredient.id)
          );
        }
      }
    });
  }

  onToggleChange(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.productsFiltered = this.productsFiltered.filter(
        (product) => product.totalQuantity == 0
      );
      this.ingredientsFiltered = this.ingredientsFiltered.filter(
        (ingredient) => ingredient.totalQuantity == 0
      );
    } else {
      this.productsFiltered = [...this.products];
      this.ingredientsFiltered = [...this.ingredients];
    }
  }

  loadProductsFilter() {
    this.productService.getProducts().subscribe((data: any) => {
      this.allProducts = data;
    });
  }

  loadCategoryProducts() {
    this.categoryProductService.getCategoryProducts().subscribe((data: any) => {
      this.categoryProducts = data;
    });
  }
  loadCategoryIngredients() {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      this.allIngredients = data;
      this.categoryIngredients = [...new Set(
        data.map((ingredient: any) => ingredient.category)
      )];
    });
  }

  loadStockMovements() {
    this.stockMovementService.getTotalItemStock().subscribe((data: any) => {
      this.products = data.productStock;
      this.productsFiltered = data.productStock;
      this.ingredients = data.itemStock;
      this.ingredientsFiltered = data.itemStock;
    });
  }

  getBaseUnit(unit: any) {
    return this.baseUnit.find((b) => b.id == unit)?.abbreviation;
  }
}
