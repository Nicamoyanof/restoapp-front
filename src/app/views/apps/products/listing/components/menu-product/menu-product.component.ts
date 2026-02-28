import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-product',
  imports: [CommonModule, NgbPagination, RouterLink],
  templateUrl: './menu-product.component.html',
  styles: ``,
})
export class MenuProductComponent {
  @Input() menuProductData: any[] = [];
  @Input() totalItems = 10;
  @Output() reload: any = new EventEmitter<void>();
  @Output() delete: any = new EventEmitter<number>();
  pageSize = 10;
  currentPage = 1;
  maxSize = Math.ceil(this.totalItems / this.pageSize);
  selectedItem: any = null;

  constructor(private modalService: NgbModal) {}

  deleteProduct(productId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete.emit(productId);
      }
    });
  }

  openModal(content: any, options: NgbModalOptions, item: any) {
    this.selectedItem = item;
    this.modalService.open(content, options);
  }
}
