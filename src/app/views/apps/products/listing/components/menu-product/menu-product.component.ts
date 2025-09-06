import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-product',
  imports: [CommonModule, NgbPagination],
  templateUrl: './menu-product.component.html',
  styles: ``,
})
export class MenuProductComponent {
  @Input() menuProductData: any[] = [];
  @Input() totalItems = 10;
  @Output() reload: any = new EventEmitter<void>();
  pageSize = 10;
  currentPage = 1;
  maxSize = Math.ceil(this.totalItems / this.pageSize);
}
