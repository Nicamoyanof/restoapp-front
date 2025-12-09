import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { orderStatusData, ordersData } from './data';
import {
  NgbDropdownModule,
  NgbModal,
  NgbModalOptions,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgClass, SlicePipe } from '@angular/common';
import { OrdersService } from '@/app/services/orders.service';
import { ProductService } from '@/app/services/product.service';
import { PaymentMethodService } from '@/app/services/payment-method.service';
import { RestaurantTablesService } from '@/app/services/restaurant-tables.service';
import { RouterLink, RouterModule } from '@angular/router';
import { DialogPrintTicketComponent } from '@views/common/dialog-print-ticket/dialog-print-ticket.component';
import { PrinterService } from '@/app/services/printer.service';

@Component({
  selector: 'app-historical-orders',
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgClass,
    RouterLink,
    RouterModule,
    SlicePipe,
    DialogPrintTicketComponent,
  ],
  templateUrl: './historical-orders.component.html',
  styleUrl: './historical-orders.component.scss',
})
export class HistoricalOrdersComponent implements OnInit {
  orderStatusData = [
    {
      icon: 'assets/images/food-icon/i-2.png',
      count: 0,
      title: 'Total',
    },
    {
      icon: 'assets/images/food-icon/i-3.png',
      count: 0,
      title: 'Canceladas',
    },
    {
      icon: 'assets/images/food-icon/i-4.png',
      count: 0,
      title: 'Preparando',
    },
    {
      icon: 'assets/images/food-icon/i-8.png',
      count: 0,
      title: 'Pedidos Pendientes',
    },
  ];
  number!: number;
  ordersData: any[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  maxSize = Math.ceil(this.totalItems / this.pageSize);
  products: any[] = [];
  paymentMethods: any[] = [];
  tables: any[] = [];
  selectedOrder: any = null;
  @ViewChild('ticket') ticketModalRef!: TemplateRef<any>;

  constructor(
    private orderService: OrdersService,
    private productService: ProductService,
    private paymentMethodService: PaymentMethodService,
    private tableRestaurantService: RestaurantTablesService,
    private modalService: NgbModal,
    private printService: PrinterService
  ) {}

  ngOnInit(): void {
    this.fetchOrders(this.currentPage);
    this.productService.getProducts().subscribe((response) => {
      this.products = response as any[];
    });
    this.paymentMethodService.getPaymentMethods().subscribe((response) => {
      this.paymentMethods = response as any[];
    });

    this.tableRestaurantService.getTables().subscribe((response) => {
      this.tables = response as any[];
    });
  }

  getPaymentMethodName(paymentMethodId: number): string {
    const paymentMethod = this.paymentMethods.find(
      (pm) => pm.paymentMethodId === paymentMethodId
    );
    return paymentMethod ? paymentMethod.name : 'Sin Método';
  }

  getProductName(productId: number): string {
    const product = this.products.find((p) => p.productId === productId);
    return product ? product.name : 'Sin Producto';
  }

  fetchOrders(page: number): void {
    this.orderService.getOrders().subscribe((response: any) => {
      this.ordersData = response;
      this.totalItems = this.ordersData.length;
      this.pageSize = 10;
      this.currentPage = page;

      this.orderStatusData.map((status) => {
        if (status.title === 'Total') {
          status.count = this.totalItems;
        }
        if (status.title === 'Canceladas') {
          status.count = this.ordersData.filter(
            (order) => order.status === 4
          ).length;
        }
        if (status.title === 'Preparando') {
          status.count = this.ordersData.filter(
            (order) => order.status === 1
          ).length;
        }
        if (status.title === 'Pedidos Pendientes') {
          status.count = this.ordersData.filter(
            (order) => order.status === 0
          ).length;
        }
      });
    });
  }

  getBadgeClasses(status: string): string[] {
    switch (status) {
      case 'Ready To Pick':
        return ['border', 'border-warning', 'text-warning'];
      case 'Out Of Delivery':
        return ['border', 'border-primary', 'text-primary'];
      case 'Progress':
        return ['border', 'border-info', 'text-info'];
      case 'Delivered':
        return ['bg-success'];
      case 'Cancel':
        return ['bg-danger'];
      default:
        return [];
    }
  }

  getTableName(tableId: number): string {
    const table = this.tables.find((t) => t.id === tableId);
    return table ? table.number : 'Sin Mesa';
  }

  getOrderStatusName(status: number): string {
    //     public enum OrderStatus { Created, InProgress, WaitingPayment, Paid, Cancelled, Closed }
    switch (status) {
      case 0:
        return 'Creado';
      case 1:
        return 'En Progreso';
      case 2:
        return 'Esperando Pago';
      case 3:
        return 'Pagado';
      case 4:
        return 'Cancelado';
      case 5:
        return 'Cerrado';
      default:
        return 'Desconocido';
    }
  }

  openModal(
    content: TemplateRef<HTMLElement>,
    options: NgbModalOptions,
    order: any
  ) {
    this.selectedOrder = order;
    this.modalService.open(content, options);
  }
  openModalTicket(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options);
  }

  printTicket() {
    // Aquí puedes implementar la lógica para imprimir el ticket
    console.log('Imprimiendo ticket para el pedido:', this.selectedOrder);
    // Por ejemplo, podrías abrir una nueva ventana con el contenido del ticket y llamar a window.print()
    this.orderService.print(this.selectedOrder.id).subscribe((response) => {
      console.log('Ticket printed successfully', response);
    });
  }

  closeModalFunc(event: string) {
    if (event !== 'close') {
      let body = {
        printerName: event,
        order: this.selectedOrder,
      };
      this.printService.postTicket(body).subscribe((response) => {
        console.log('Ticket printed successfully', response);
        this.modalService.dismissAll();
      });
    } else {
      this.modalService.dismissAll();
    }
  }
}
