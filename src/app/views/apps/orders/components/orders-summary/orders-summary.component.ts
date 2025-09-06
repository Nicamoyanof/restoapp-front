import { Component } from '@angular/core';
import { ordersData } from '../../data';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-summary',
  imports: [CommonModule, NgbDropdownModule, NgbPaginationModule],
  templateUrl: './orders-summary.component.html',
  styles: ``
})
export class OrdersSummaryComponent {
  number!: number
  ordersData = ordersData;
  totalItems = 3;
  pageSize = 1;
  currentPage = 1;
  maxSize = 3;

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
}
