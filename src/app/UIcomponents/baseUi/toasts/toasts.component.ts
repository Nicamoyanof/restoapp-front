import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast.service';
import { ToastsContainer } from './toasts-container.component';

@Component({
  selector: 'app-toasts',
  imports: [NgbToastModule, FormsModule],
  templateUrl: './toasts.component.html',
  styles: ``,
})
export class ToastsComponent {
  toastService = inject(ToastService);
  liveToast = false;
  show = true;
  show1 = true;
  show2 = true;
  show3 = true;
  placement = true;
  translucent = true;
  toastPlacement: string = '';
  showToast = false;
  showToast1 = false;
  showToast2 = false;
  close() {
    this.show = false;
  }

  // showStandard(template: TemplateRef<any>) {
  //   this.toastService.show({ template });

  // }

  // showSuccess() {
  //   this.toastService.showToast({
  //     content: 'Heads up, toasts will stack automatically',
  //     delay: 10000,
  //     classname: 'standard',
  //   })
  // }
}
