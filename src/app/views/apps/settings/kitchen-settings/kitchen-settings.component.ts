import { KitchenService } from '@/app/services/kitchen.service';
import { NgClass } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kitchen-settings',
  imports: [NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './kitchen-settings.component.html',
  styleUrl: './kitchen-settings.component.scss',
})
export class KitchenSettingsComponent implements OnInit {
  showAddKitchenModal = false;
  newKitchenName = '';
  kitchens: any[] = [];
  formGroup: any;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private kitchenService: KitchenService
  ) {
    this.formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.loadKitchens();
  }

  loadKitchens() {
    this.kitchenService.getKitchens().subscribe({
      next: (data: any) => {
        this.kitchens = data;
      },
      error: (error) => {
        console.error('Error fetching kitchens:', error);
      },
    });
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options);
  }
  deleteKitchen(kitchenId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.kitchenService.deleteKitchen(kitchenId).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'La cocina ha sido eliminada.',
              'success'
            ).then(() => {
              // Recargar la lista de cocinas o realizar alguna acción adicional
              this.loadKitchens();
            });
          },
          (error) => {
            console.error('Error al eliminar la cocina:', error);
          }
        );
      }
    });
  }
  createKitchen() {
    if (this.formGroup.valid) {
      const newKitchen = {
        name: this.formGroup.value.name,
      };
      this.kitchenService.createKitchen(newKitchen).subscribe(
        (response) => {
          //usar swat
          Swal.fire('Éxito', 'Cocina creada exitosamente', 'success').then(
            () => {
              // Recargar la lista de cocinas o realizar alguna acción adicional
              this.formGroup.reset(); // Reiniciar el formulario
              this.modalService.dismissAll(); // Cerrar el modal
              this.loadKitchens(); // Recargar la lista de cocinas
            }
          );
          this.modalService.dismissAll();
        },
        (error) => {
          // Manejar el error
          Swal.fire('Error', 'Hubo un problema al crear la cocina', 'error');
        }
      );
    }
  }
}
