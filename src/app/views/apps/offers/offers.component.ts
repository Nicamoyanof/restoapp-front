import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { offers } from './data';

@Component({
  selector: 'app-offers',
  imports: [],
  templateUrl: './offers.component.html',
  styles: ``
})
export class OffersComponent {
  offersData = offers;
  offers = [
    { image: 'assets/images/food-icon/offer-1.png', alt: 'Offer 1' },
    { image: 'assets/images/food-icon/offer-2.png', alt: 'Offer 2' },
    { image: 'assets/images/food-icon/offer-3.png', alt: 'Offer 3' }
  ];
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
        this.offersData.splice(index, 1);
        Swal.fire('Eliminado!', 'La oferta ha sido eliminada.', 'success');
      }
    });
  }
}
