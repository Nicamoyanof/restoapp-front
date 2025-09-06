import { Component } from '@angular/core';
import { CustomerStatComponent } from "./components/customer-stat/customer-stat.component";
import { CustomerListComponent } from "./components/customer-list/customer-list.component";

@Component({
  selector: 'app-customers',
  imports: [CustomerStatComponent, CustomerListComponent],
  templateUrl: './customers.component.html',
  styles: ``
})
export class CustomersComponent {

}
