import { Component, OnInit } from '@angular/core';
import { OrderSummaryComponent } from '../pos/component/order-summary/order-summary.component';
import { RestaurantTablesService } from '@/app/services/restaurant-tables.service';
import { PaymentMethodService } from '@/app/services/payment-method.service';
import { ProductService } from '@/app/services/product.service';
import { OrdersService } from '@/app/services/orders.service';
import { CategoryProductService } from '@/app/services/category-product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order',
  imports: [OrderSummaryComponent],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss',
})
export class EditOrderComponent implements OnInit {
  categoriesProducts: any[] = [];
  products: any[] = [];
  order: any = null;
  paymentMethods: any[] = [];

  constructor(
    private orderService: OrdersService,
    private productService: ProductService,
    private paymentMethodService: PaymentMethodService,
    private categoryService: CategoryProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response as any[];
    });
    this.paymentMethodService.getPaymentMethods().subscribe((response) => {
      this.paymentMethods = response as any[];
    });
    this.categoryService.getCategoryProducts().subscribe((response) => {
      this.categoriesProducts = response as any[];
    });
    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(Number(orderId)).subscribe((response) => {
        this.order = response;
      });
    }
  }

  handleAddItem(event: any) {
    // Handle add item event
    if (this.order) {
      const orderId = this.order.id;
      console.log('Adding item to order', orderId, event);
      this.orderService.addItemToOrder(orderId, event).subscribe({
        next: (response) => {
          console.log('Item added successfully', response);
          Swal.fire('Éxito', 'Ítem agregado correctamente', 'success').then(
            () => {
              this.orderService
                .getOrderById(Number(orderId))
                .subscribe((response) => {
                  this.order = response;
                });
            }
          );
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un error al agregar el ítem', 'error');
        },
      });
    }
  }

  handleUpdateItem(event: any) {
    // Handle update item event
  }

  onRefreshOrder() {
    // Handle refresh order event
  }
}
