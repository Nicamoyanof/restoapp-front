import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OrdersStatusComponent } from './components/orders-status/orders-status.component';
import { OrdersSummaryComponent } from './components/orders-summary/orders-summary.component';
import { OrdersService } from '@/app/services/orders.service';
import { ProductService } from '@/app/services/product.service';
import { RestaurantTablesService } from '@/app/services/restaurant-tables.service';
import { filter, forkJoin, Subscription } from 'rxjs';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { WebSocketService } from '@/app/services/web-socket.service';
import { AuthService } from '@auth0/auth0-angular';
import { KitchenService } from '@/app/services/kitchen.service';

@Component({
  selector: 'app-orders',
  imports: [OrdersStatusComponent, OrdersSummaryComponent, DropzoneModule],
  templateUrl: './orders.component.html',
  styles: ``,
})
export class OrdersComponent implements OnInit, AfterViewInit {
  orders: any;
  products: any;
  tables: any[] = [];
  auxOrders: any;
  orderStatusData = [
    {
      id: 1,
      icon: 'assets/images/food-icon/i-2.png',
      count: 0,
      title: 'Total de Pedidos',
    },
    {
      id: 2,
      icon: 'assets/images/food-icon/i-4.png',
      count: 0,
      title: 'En Preparación',
    },
    {
      id: 3,
      icon: 'assets/images/food-icon/i-8.png',
      count: 0,
      title: 'Pendientes',
    },
    {
      id: 4,
      icon: 'assets/images/food-icon/i-9.png',
      count: 0,
      title: 'Pedido Entregado',
    },
  ];
  allKitchen: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private productService: ProductService,
    private tableService: RestaurantTablesService,
    private wsService: WebSocketService,
    private auth: AuthService,
    private kitchenService: KitchenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      products: this.productService.getProducts(),
      tables: this.tableService.getTables(),
      kitchen: this.kitchenService.getKitchens(),
    }).subscribe(({ products, tables, kitchen }) => {
      this.products = products;
      this.tables = tables as any[];
      this.allKitchen = kitchen as any[];
      setTimeout(() => {
        this.connect();
      }, 2000);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.connect();
    }, 2000);
  }

  calcLengthByStatus() {
    const totalOrders = [...this.auxOrders].length;
    const preparingOrders = [...this.auxOrders].filter(
      (o: { status: number }) => o.status === 1
    ).length;
    const pendingOrders = [...this.auxOrders].filter(
      (o: { status: number }) => o.status === 0
    ).length;
    const deliveredOrders = [...this.auxOrders].filter(
      (o: { status: number }) => o.status === 2
    ).length;

    this.orderStatusData = this.orderStatusData.map((status) => {
      console.log(status);
      switch (status.id) {
        case 1:
          status.count = totalOrders;
          break;
        case 2:
          status.count = preparingOrders;
          break;
        case 3:
          status.count = pendingOrders;
          break;
        case 4:
          status.count = deliveredOrders;
          break;
      }
      return status;
    });
  }

  onChangeStatus(event: { order: any; item: any; newStatus: number }) {
    const { order, item, newStatus } = event;
    if (newStatus === 1) {
      this.ordersService
        .markPreparingItemFromOrder(order, item)
        .subscribe(() => {});
    } else if (newStatus === 2) {
      this.ordersService
        .markReadyItemFromOrder(order, item)
        .subscribe(() => {});
    } else if (newStatus === 3) {
      this.ordersService.cancelOrder(order).subscribe(() => {
        item.status = newStatus;
      });
    }
  }

  onRefreshOrder() {}

  onStatusChange(statusIds: number[]) {
    console.log(statusIds);
    if (statusIds.length === 0) {
      this.orders = [...this.auxOrders];
      return;
    } else {
      this.orders = [];
    }
    statusIds.forEach((element: any) => {
      switch (element) {
        case 2:
          this.orders.push(
            ...this.auxOrders.filter((o: { status: number }) => o.status == 1)
          );
          break;
        case 3:
          this.orders.push(
            ...this.auxOrders.filter((o: { status: number }) => o.status == 0)
          );
          break;
        case 4:
          this.orders.push(
            ...this.auxOrders.filter((o: { status: number }) => o.status == 2)
          );
          break;
        default:
          this.orders = [...this.auxOrders];
          break;
      }
    });
  }

  connect() {
    console.log('Connecting to WebSocket...', this.wsService.isConnected);
    if (this.wsService.isConnected) {
      this.wsService.sendMessage({ type: 0, content: 'Hola WS' });
    }
    this.wsService.connect();
    this.wsService.messages
      .pipe(filter((msg) => msg !== null))
      .subscribe((msg) => {
        console.log('Mensaje WS recibido en OrdersComponent:', msg);
        switch (msg.type) {
          case 1:
            console.log('Orders updated via WS:', this.orders);
            this.auxOrders = msg.body.flatMap(
              (o: { items: any[]; tableId: any; id: any }) =>
                (o.items ?? []).map((it: any) => ({
                  key: `${o.id}-${it.id}`,
                  itemId: it.id,
                  orderId: o.id,
                  tableNumber:
                    this.tables.find((t) => t.id === o.tableId)?.number ?? null,
                  tsCreated: it.tsCreated,
                  product: this.products.find(
                    (p: { productId: any }) => p.productId === it.productId
                  )?.name,
                  quantity: it.quantity,
                  unitPrice: it.unitPrice,
                  subtotal: it.subtotal,
                  notes: it.notes,
                  isCanceled: it.isCanceled,
                  status: it.status,
                  alertTime: this.allKitchen.find(
                    (k) => k.kitchenId === it.kitchenId
                  )?.alertTime,
                }))
            );
            // quiero ordenar el auxOrdes porel orden que viene poor defecto pero si el status es 2 o 3 que vaya al ultimo
            this.auxOrders.sort((a: any, b: any) => {
              if (a.status !== b.status) {
                if (a.status === 2 || a.status === 3) return 1;
                if (b.status === 2 || b.status === 3) return -1;
              }
              return 0;
            });
            this.orders = [...this.auxOrders];
            this.calcLengthByStatus();
            // this.cdr.detectChanges();
            break;
        }
      });
  }

  send() {
    this.wsService.sendMessage({ type: 'ping', content: 'Hola WS' });
  }

  ngOnDestroy() {
    this.wsService.close();
  }
}
