import { IngredientsService } from '@/app/services/ingredients.service';
import { ProductService } from '@/app/services/product.service';
import { StockMovementService } from '@/app/services/stock-movement.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseUnitEnum } from '@common/base-units';
import { MovementType } from '@common/movement-type.enum';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stock-movement',
  imports: [CommonModule, RouterLink, NgbPagination],
  templateUrl: './stock-movement.component.html',
  styleUrl: './stock-movement.component.scss',
})
export class StockMovementComponent implements OnInit {
  stockMovementData: any[] = [];
  currentPage = 1;
  pageSize = 10;
  maxSize = 5;
  totalItems = 0;
  products: any[] = [];
  ingredients: any[] = [];
  baseUnit = BaseUnitEnum;

  constructor(
    private readonly stockMovementService: StockMovementService,
    private readonly ingredientService: IngredientsService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchStockMovementData();
    // hacer un fork join para traer ambos
    forkJoin([
      this.ingredientService.getIngredients(),
      this.productService.getProducts(),
    ]).subscribe(([ingredients, products]: any[]) => {
      this.ingredients = ingredients;
      this.products = products;
    });
  }

  fetchStockMovementData() {
    this.stockMovementService.getStockMovements().subscribe((data: any) => {
      this.stockMovementData = data;
      this.totalItems = data.length;
    });
  }

  getMovedItemName(movement: any): string {
    if (movement.itemId) {
      const ingredient = this.ingredients.find(
        (ing) => ing.id === movement.itemId
      );
      return ingredient ? ingredient.name : 'Unknown Ingredient';
    } else {
      const product = this.products.find(
        (prod) => prod.productId === movement.productId
      );
      return product ? product.name : 'Unknown Product';
    }
  }
  getDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }
  translateMovementType(type: any) {
    switch (type) {
      case MovementType.PURCHASE:
        return 'Compra';
      case MovementType.SALE:
        return 'Venta';
      case MovementType.ADJUSTMENT:
        return 'Ajuste';
      case MovementType.PRODUCTION_IN:
        return 'Producción Entrada';
      case MovementType.PRODUCTION_OUT:
        return 'Producción Salida';
      case MovementType.CANCEL:
        return 'Cancelación';
      default:
        return type;
    }
  }

  getBaseUnit(unit: any) {
    if (unit.itemId > 0) {
      const ingredient = this.ingredients.find((ing) => ing.id == unit.itemId);
      return this.baseUnit.find((b) => b.id == ingredient?.baseUnitId)
        ?.abbreviation;
    } else {
      return 'u';
    }
  }
  getCurrentStock(item: any) {
    switch (item.movementType) {
      case MovementType.PURCHASE:
        return item.lastQuantity + item.qtyBase;
      case MovementType.PRODUCTION_IN:
        return item.qtyBase;
      case MovementType.SALE:
        return item.lastQuantity - item.qtyBase;
      case MovementType.PRODUCTION_OUT:
        return item.lastQuantity;
      case MovementType.ADJUSTMENT:
        return item.qtyBase;
      case MovementType.CANCEL:
        return item.lastQuantity;
      default:
        return 0;
    }
  }
}
