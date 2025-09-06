import { Component } from '@angular/core';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { customerList } from '../data';

@Component({
  selector: 'app-customer-list',
  imports: [NgbPaginationModule,NgbDropdownModule],
  templateUrl: './customer-list.component.html',
  styles: ``
})
export class CustomerListComponent {
  customerList = customerList
  totalItems = 3;
  pageSize = 1;
  currentPage = 1;
  maxSize = 3;
}
