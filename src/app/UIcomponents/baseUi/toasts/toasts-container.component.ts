import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  inject,
} from '@angular/core';
import { ToastService } from './toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastyfyComponent } from '../../advanceUI/toastyfy/toastyfy.component';
import { ToastifyDirective } from '@core/directives/toastify.diretive';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ToastyfyComponent, ToastifyDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ``,
  template: `
    <!-- @for (toast of toastService.toasts; track $index) {
    <button
      type="button"
      appToastify
      [toastMessage]="toast.content"
      [toastGravity]="toast.gravity"
      [toastPosition]="toast.position"
      [toastClassName]="'bg-success'"
      [toastDuration]="3000"
      [toastClose]="true"
      data-toast-close="close"
      data-toast-style="style"
      class="btn btn-light w-xs"
    ></button>
    } -->
  `,
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsContainer {
  // toastService = inject(ToastService);
  // isTemplate(toast: any) {
  //   return toast.content instanceof TemplateRef;
  // }
}
