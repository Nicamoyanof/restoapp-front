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
  isEdit: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private kitchenService: KitchenService
  ) {
    this.formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      alertTime: [null],
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
      if (this.isEdit) {
        const updatedKitchen = {
          kitchenId: this.formGroup.value.id,
          name: this.formGroup.value.name,
          showOnMonitor: false,
          alertTime: Number(this.formGroup.value.alertTime),
        };
        this.kitchenService
          .updateKitchen(this.formGroup.value.id, updatedKitchen)
          .subscribe({
            next: (response) => {
              Swal.fire(
                'Éxito',
                'Cocina actualizada exitosamente',
                'success'
              ).then(() => {
                this.formGroup.reset(); // Reiniciar el formulario
                this.modalService.dismissAll();
                this.loadKitchens(); // Recargar la lista de cocinas
                this.isEdit = false;
              });
            },
            error: (error) => {
              // Manejar el error
              Swal.fire(
                'Error',
                'Hubo un problema al actualizar la cocina',
                'error'
              );
              console.error('Error al actualizar la cocina:', error);
              this.isEdit = false;
            },
          });
      } else {
        const newKitchen = {
          name: this.formGroup.value.name,
          alertTime: Number(this.formGroup.value.alertTime),
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
  editKitchen(
    content: TemplateRef<HTMLElement>,
    options: NgbModalOptions,
    kitchenId: string
  ) {
    this.isEdit = true;
    const kitchen = this.kitchens.find((k) => k.kitchenId === kitchenId);
    if (kitchen) {
      this.formGroup.patchValue({
        id: kitchen.kitchenId,
        name: kitchen.name,
      });
      const modalOptions: NgbModalOptions = {
        size: 'lg',
        centered: true,
      };
      this.modalService.open(content, modalOptions);
    }
  }
  toggleShowOnMonitor(kitchenId: string, showOnMonitor: boolean) {
    this.kitchenService
      .updateKitchenShowOnMonitor(Number(kitchenId), showOnMonitor)
      .subscribe({
        next: () => {
          Swal.fire(
            'Actualizado',
            'La configuración de la cocina ha sido actualizada.',
            'success'
          );
        },
        error: (error) => {
          console.error('Error al actualizar la cocina:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al actualizar la cocina',
            'error'
          );
        },
      });
  }
}
