import { OrdersService } from '@/app/services/orders.service';
import { CurrencyPipe, DecimalPipe, NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';
import {
  NgbModal,
  NgbModalOptions,
  NgbRatingModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { take } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-summary',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    NouisliderModule,
    NgbRatingModule,
    SelectFormInputDirective,
    NgClass,
    NgbTooltip,
    DecimalPipe,
  ],
  templateUrl: './order-summary.component.html',
  styles: ``,
})
export class OrderSummaryComponent implements OnInit, AfterViewInit {
  value: number = 1;
  meatValue: number = 2;
  indianValue: number = 2;
  @Input() categoriesProducts: any[] = [];
  @Input() products: any[] = [];
  productsFiltered: any[] = [];
  qty: number = 0;
  specialRequest: string = '';
  @Output() addItemEvent = new EventEmitter<any>();
  @Output() updateItemInOrder = new EventEmitter<any>();
  @Input() order: any = null;
  @Input() paymentMethods: any[] = [];
  selectedPayment: any = null;
  discount: number = 0; // Descuento en porcentaje
  @Output() refreshOrder = new EventEmitter<void>();
  reloadChoices = new EventEmitter<any>();
  categorySelected: string | number | null = null;
  productSelected: string | number | null = null;
  @ViewChild('prodSel') prodSel!: SelectFormInputDirective;
  @Input() isEditing: boolean = false;

  constructor(
    private modalService: NgbModal,
    private orderService: OrdersService,
    private zone: NgZone
  ) {
    this.productsFiltered = this.products;
  }

  ngOnInit(): void {
    this.productsFiltered = this.products;
    this.filterProductsByCategory();
  }

  ngAfterViewInit(): void {
    if (this.order.paymentMethod) {
      this.selectedPayment = this.paymentMethods.find(
        (p) => p.paymentMethodId === this.order.paymentMethod
      )?.name;
      this.discount =
        this.order.discount ??
        this.paymentMethods.find(
          (p) => p.paymentMethodId === this.order.paymentMethod
        )?.discountPercent;
    }
  }

  // Handlers for the first counter:
  handleMinusValue(item: any) {
    // preguntar si esta seguro de querer agregar un item mas con sweetalert
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres quitar un item de la lista?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && item.quantity > 1) {
        this.updateItemInOrder.emit({
          itemId: item.id,
          qty: item.quantity - 1,
        });
      }
    });
  }

  handlePlusValue(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres agregar un item a la lista?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateItemInOrder.emit({
          itemId: item.id,
          qty: item.quantity + 1,
        });
      }
    });
  }

  // Handlers for the second counter:
  handleMinusMeat() {
    if (this.meatValue > 0) {
      this.meatValue--;
    }
  }

  handlePlusMeat() {
    if (this.meatValue < 100) {
      this.meatValue++;
    }
  }
  // Handlers for the second counter:
  handleMinusIndian() {
    if (this.indianValue > 0) {
      this.indianValue--;
    }
  }

  handlePlusIndian() {
    if (this.indianValue < 100) {
      this.indianValue++;
    }
  }

  addItem() {
    if (this.productSelected && this.qty > 0) {
      const newItem = {
        productId: Number(this.productSelected),
        qty: this.qty,
        notes: this.specialRequest,
      };
      this.addItemEvent.emit(newItem);
      this.modalService.dismissAll(); // Cierra el modal después de agregar el ítem
      // Reset form fields
      this.productSelected = null;
      this.qty = 1;
      this.specialRequest = '';
    }
  }
  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options);
  }

  filterProductsByCategory() {
    const cat = this.categorySelected;
    this.productsFiltered = cat
      ? this.products.filter((p) => String(p.categoryId) === String(cat))
      : [...this.products];

    // reset selección de producto
    this.productSelected = null;

    // mapear a ChoiceItem y emitir como payload
    const items = this.productsFiltered.map((p) => ({
      value: String(p.productId),
      label: `${p.name} - $ ${p.price.toFixed(2)}`,
    }));

    this.reloadChoices.emit(items); // ✅ carga directa en Choices
  }
  getProductName(item: any): string {
    const product = this.products.find(
      (prod) => prod.productId === item.productId
    );
    return product ? product.name : 'Unknown Product';
  }
  getNoteMaxLength(item: any): string {
    if (item.notes && item.notes.length > 30) {
      return item.notes.substring(0, 30) + '...';
    }
    return item.notes;
  }

  getQtyItems(order: any): number {
    return order.items.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
  }

  getSubtotal(order: any): number {
    return order.items.reduce(
      (total: number, item: any) => total + item.unitPrice * item.quantity,
      0
    );
  }

  onPaymentMethodChange(event: any) {
    this.selectedPayment = event;
    this.discount =
      this.paymentMethods.find((method) => method.name === event)
        ?.discountPercent || 0;
    console.log(
      'Selected Payment Method:',
      this.selectedPayment,
      this.paymentMethods
    );
  }

  closeOrder() {
    if (!this.selectedPayment) {
      Swal.fire({
        icon: 'warning',
        title: 'Método de pago requerido',
        text: 'Por favor, selecciona un método de pago antes de cerrar la orden.',
      });
      return;
    }

    var paymentMethodId = this.paymentMethods.find(
      (method) => method.name === this.selectedPayment
    )?.paymentMethodId;

    console.log('Payment Method ID:', paymentMethodId);

    if (this.isEditing) {
      this.orderService
        .changePaymentMethod(this.order.id, paymentMethodId!)
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Método de pago cambiado',
              text: 'El método de pago se ha cambiado exitosamente.',
            });
            this.refreshOrder.emit();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al cambiar el método de pago',
              text: 'Por favor, intenta nuevamente.',
            });
          },
        });
    } else {
      this.orderService
        .closeOrder(this.order.id, { paymentMethodId })
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Orden cerrada',
              text: 'La orden se ha cerrado exitosamente.',
            });
            this.refreshOrder.emit();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al cerrar la orden',
              text: 'Por favor, intenta nuevamente.',
            });
          },
        });
    }
  }

  cancelOrder() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar orden',
      cancelButtonText: 'No, mantener orden',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancelOrder(this.order.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Orden cancelada',
              text: 'La orden se ha cancelado exitosamente.',
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al cancelar la orden',
              text: 'Por favor, intenta nuevamente.',
            });
          },
        });
      }
    });
  }

  removeItem(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, mantener',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService
          .removeItemFromOrder(this.order.id, item.id)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Artículo eliminado',
                text: 'El artículo se ha eliminado exitosamente.',
              });
              this.refreshOrder.emit();
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el artículo',
                text: 'Por favor, intenta nuevamente.',
              });
            },
          });
      }
    });
  }

  getProdMaxLength(): number {
    const selectedProduct = this.products.find(
      (p) => p.productId == this.productSelected
    );
    return selectedProduct
      ? selectedProduct.trackStock
        ? selectedProduct.stock
        : 1000000
      : 0;
  }

  getStockStatus(): string {
    const selectedProduct = this.products.find(
      (p) => p.productId == this.productSelected
    );
    if (!selectedProduct) return 'No seleccionado';
    if (selectedProduct.stock <= 0) return 'Sin stock';
    if (selectedProduct.stock < 5) return 'Bajo stock';
    return 'En stock';
  }

  onQtyChange() {
    const maxLength = this.getProdMaxLength();
    if (this.qty > maxLength) {
      this.zone.run(() => {
        this.qty = maxLength;
      });
    }
  }

  onSpecialRequestChange() {
    if (this.specialRequest.length > 300) {
      this.zone.run(() => {
        this.specialRequest = this.specialRequest.substring(0, 300);
      });
    }
  }
}
