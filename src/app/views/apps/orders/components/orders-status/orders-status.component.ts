import { Component } from '@angular/core';
import { orderStatusData } from '../../data';

@Component({
  selector: 'app-orders-status',
  imports: [],
  templateUrl: './orders-status.component.html',
  styles: ``
})
export class OrdersStatusComponent {
  orderStatusData = orderStatusData
}
