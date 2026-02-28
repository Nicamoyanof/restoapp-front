import { Component } from '@angular/core';
import { NgbDropdownModule, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { allReportData } from '../../data';

@Component({
  selector: 'app-all-report',
  imports: [NgbDropdownModule],
  templateUrl: './all-report.component.html',
  styles: ``
})
export class AllReportComponent {
  allReportData = allReportData;
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
        this.allReportData.splice(index, 1);
        Swal.fire('Eliminado!', 'El reporte ha sido eliminado.', 'success');
      }
    });
  }
}
