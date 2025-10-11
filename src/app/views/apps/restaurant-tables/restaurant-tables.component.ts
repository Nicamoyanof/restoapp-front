import { RestaurantTablesService } from '@/app/services/restaurant-tables.service';
import { NgClass } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbModal,
  NgbModalModule,
  NgbModalOptions,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { OrderSummaryComponent } from '../pos/component/order-summary/order-summary.component';
import { ProductService } from '@/app/services/product.service';
import { CategoryProductService } from '@/app/services/category-product.service';
import { OrdersService } from '@/app/services/orders.service';
import { PaymentMethodService } from '@/app/services/payment-method.service';

@Component({
  selector: 'app-restaurant-tables',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgClass,
    OrderSummaryComponent,
  ],
  templateUrl: './restaurant-tables.component.html',
  styleUrl: './restaurant-tables.component.scss',
})
export class RestaurantTablesComponent implements OnInit {
  formGroup: FormGroup;
  formGroupStateTable: FormGroup;
  tables: any[] = []; // Aquí puedes almacenar las mesas obtenidas de la API
  products: any[] = []; // Aquí puedes almacenar los productos obtenidos de la API
  categoriesProducts: any[] = []; // Aquí puedes almacenar las categorías de productos obtenidas de la API
  tableSelected: any = null;
  paymentMethods: any[] = []; // Aquí puedes almacenar los métodos de pago obtenidos de la API
  tipAmount: number = 0;

  constructor(
    private readonly restaurantTablesService: RestaurantTablesService,
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private readonly productsService: ProductService,
    private readonly categoryProductsService: CategoryProductService,
    private readonly ordersService: OrdersService,
    private readonly paymentMethodService: PaymentMethodService
  ) {
    this.formGroup = this.fb.group({
      // Define your form controls and validation here
      id: [null],
      number: [null, [Validators.required]],
      capacity: [null],
      section: [null],
    });
    this.formGroupStateTable = this.fb.group({
      id: [null],
      status: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadTables();
    this.loadProducts();
    this.loadCategoriesProducts();
    this.loadPaymentMethods();
  }
  loadPaymentMethods() {
    this.paymentMethodService.getPaymentMethods().subscribe((data: any) => {
      this.paymentMethods = data;
    });
  }
  loadCategoriesProducts() {
    this.categoryProductsService
      .getCategoryProducts()
      .subscribe((data: any) => {
        console.log(data);
        this.categoriesProducts = data;
      });
  }
  loadProducts() {
    this.productsService.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data;
    });
  }

  loadTables() {
    this.restaurantTablesService.getTables().subscribe((data: any) => {
      this.tables = data;
      if (this.tableSelected) {
        this.formGroupStateTable.patchValue({
          id: this.tableSelected.id,
          status: this.tableSelected.status,
        });
        this.tableSelected = this.tables.find(
          (t) => t.id === this.tableSelected.id
        );
      }
    });
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options);
  }

  createTable() {
    // Logic to open a modal for adding a new table agregar sweet alert
    this.restaurantTablesService.addTable(this.formGroup.value).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Mesa agregada correctamente', 'success').then(
          () => {
            // Optionally, you can refresh the list of tables here
            this.modalService.dismissAll();
            this.formGroup.reset();
            this.loadTables();
          }
        );
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un error al agregar la mesa', 'error');
      },
    });
  }

  openEnd(content: TemplateRef<HTMLElement>, table: any) {
    this.tableSelected = table;
    this.formGroupStateTable.patchValue({
      id: table.id,
      status: table.status,
    });
    if (this.tableSelected.order) {
      this.formGroup.get('status')?.disable();
    }
    this.offcanvasService.open(content, { position: 'end' });
  }

  updateTableStatus() {
    const body: any = {
      id: this.formGroupStateTable.value.id,
      status: Number(this.formGroupStateTable.value.status),
    };

    if (
      this.formGroupStateTable.value.status == 2 ||
      this.formGroupStateTable.value.status == 3
    ) {
      let bodyOrder: any = {
        type: 0,
        tableId: this.formGroupStateTable.value.id,
        covers: this.tables.find((t) => t.id == body.id).capacity,
        customerName: null,
      };
      this.ordersService.createOrder(bodyOrder).subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Estado de la mesa actualizado', 'success').then(
            () => {
              this.offcanvasService.dismiss();
              this.loadTables();
            }
          );
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un error al actualizar el estado', 'error');
        },
      });
    } else if (this.formGroupStateTable.value.status == 5) {
      this.restaurantTablesService.outOfServiceTable(body.id, {}).subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Estado de la mesa actualizado', 'success').then(
            () => {
              this.offcanvasService.dismiss();
              this.loadTables();
            }
          );
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un error al actualizar el estado', 'error');
        },
      });
    } else {
      this.restaurantTablesService.updateTable(body).subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Estado de la mesa actualizado', 'success').then(
            () => {
              this.offcanvasService.dismiss();
              this.loadTables();
            }
          );
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un error al actualizar el estado', 'error');
        },
      });
    }
  }

  handleAddItem(event: any) {
    console.log(event, this.tableSelected);
    if (this.tableSelected && this.tableSelected.order) {
      const orderId = this.tableSelected.order.id;
      this.ordersService.addItemToOrder(orderId, event).subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Ítem agregado correctamente', 'success').then(
            () => {
              this.loadTables();
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
    console.log(event, this.tableSelected);
    if (this.tableSelected && this.tableSelected.order) {
      const orderId = this.tableSelected.order.id;
      this.ordersService
        .updateItemInOrder(orderId, event.itemId, { qty: event.qty })
        .subscribe({
          next: (response) => {
            this.loadTables();
          },
          error: (error) => {
            Swal.fire('Error', 'Hubo un error al actualizar el ítem', 'error');
          },
        });
    }
  }

  onRefreshOrder() {
    this.loadTables();
    this.tableSelected = null;
    this.formGroupStateTable.reset();
    this.formGroup.reset();
    this.offcanvasService.dismiss();
  }

  payAndFreeTable() {
    const body: any = {
      orderId: this.tableSelected.order.id,
      tipMethod: 0,
      tipAmount: this.tipAmount,
    };

    this.restaurantTablesService
      .freeTable(this.tableSelected.id, body)
      .subscribe({
        next: (response) => {
          Swal.fire(
            'Éxito',
            'Mesa liberada y propina registrada',
            'success'
          ).then(() => {
            this.offcanvasService.dismiss();
            this.loadTables();
            this.tableSelected = null;
            this.formGroupStateTable.reset();
            this.formGroup.reset();
            this.tipAmount = 0;
          });
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un error al liberar la mesa', 'error');
        },
      });
  }

  printTicket() {
    this.ordersService.print(this.tableSelected.order.id).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Ticket enviado a impresión', 'success');
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un error al imprimir el ticket', 'error');
      },
    });
  }
}
