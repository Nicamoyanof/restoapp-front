import { Component } from '@angular/core';
import { OrdersStatusComponent } from "./components/orders-status/orders-status.component";
import { OrdersSummaryComponent } from "./components/orders-summary/orders-summary.component";

@Component({
  selector: 'app-orders',
  imports: [OrdersStatusComponent, OrdersSummaryComponent],
  templateUrl: './orders.component.html',
  styles: ``
})
export class OrdersComponent {

}
