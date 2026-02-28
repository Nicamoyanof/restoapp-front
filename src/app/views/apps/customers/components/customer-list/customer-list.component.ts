import { Component } from '@angular/core';
import { NgbDropdownModule, NgbPaginationModule, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
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
  selectedItem: any = null;

  constructor(private modalService: NgbModal) {}

  openModal(content: any, options: NgbModalOptions, item: any) {
    this.selectedItem = item;
    this.modalService.open(content, options);
  }

  deleteItem(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerList.splice(index, 1);
      }
    });
  }
}
