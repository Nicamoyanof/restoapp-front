import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { riders } from './data';

@Component({
  selector: 'app-riders',
  imports: [],
  templateUrl: './riders.component.html',
  styles: ``
})
export class RidersComponent {
  ridersData = riders;
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
        this.ridersData.splice(index, 1);
        Swal.fire('Eliminado!', 'El rider ha sido eliminado.', 'success');
      }
    });
  }
}
