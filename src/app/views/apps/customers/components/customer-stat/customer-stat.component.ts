import { Component } from '@angular/core';
import { customerStat } from '../../data';

@Component({
  selector: 'app-customer-stat',
  imports: [],
  templateUrl: './customer-stat.component.html',
  styles: ``
})
export class CustomerStatComponent {
  customerStat = customerStat
}
