import { PaymentMethodService } from '@/app/services/payment-method.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-methods',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss',
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: any[] = [];
  formArray: any = null;
  savingIndex: number | null = null;

  constructor(
    private paymentMethodService: PaymentMethodService,
    public fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods() {
    // Call the service to get payment methods
    this.paymentMethodService.getPaymentMethods().subscribe((data: any) => {
      this.paymentMethods = data;
      this.buildForm();
    });
  }
  buildForm() {
    // this.formArray.clear();
    for (const pm of this.paymentMethods) {
      //si no esta inicializado el formArray, inicializarlo
      if (!this.formArray) {
        this.formArray = this.fb.array([]);
      }
      this.formArray.push(
        this.fb.group({
          id: [pm.paymentMethodId],
          name: [{ value: pm.name, disabled: true }],
          code: [{ value: pm.code, disabled: true }],
          discountPercent: [
            pm.discountPercent,
            [Validators.min(0), Validators.max(100)],
          ],
        })
      );
    }
  }

  onSave(i: number) {
    console.log('Guardando índice:', i);
    const fg = this.formArray.at(i) as FormGroup;
    if (fg.invalid || fg.pristine) return;

    const { id, discountPercent } = { ...fg.getRawValue(), ...fg.value };

    this.savingIndex = i;

    // Llamada a tu API
    // this.svc.updateDiscount(id, discountPercent).subscribe({
    //   next: () => { fg.markAsPristine(); this.savingIndex = null; },
    //   error: () => { this.savingIndex = null; }
    // });
    let body = {
      paymentMethodId: id,
      code: fg.get('code')?.value,
      name: fg.get('name')?.value,
      discountPercent: fg.get('discountPercent')?.value,
      isActive: true,
    };

    this.paymentMethodService.updatePaymentMethod(id, body).subscribe({
      next: () => {
        fg.markAsPristine();
        this.savingIndex = null;
        //SweetAlert
        Swal.fire({
          title: 'Éxito',
          text: 'Método de pago actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: () => {
        this.savingIndex = null;
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar el método de pago',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });

    // Demo sin servicio:
    setTimeout(() => {
      fg.markAsPristine();
      this.savingIndex = null;
    }, 500);
  }

  formAt(i: number) {
    return this.formArray.at(i) as FormGroup;
  }
}
