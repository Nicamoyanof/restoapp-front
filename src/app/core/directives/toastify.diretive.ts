import { Directive, Input, HostListener } from '@angular/core';
import Toastify from 'toastify-js';

@Directive({
  selector: '[appToastify]'
})
export class ToastifyDirective {
  @Input() toastMessage: string = '';
  @Input() toastGravity: string = 'top'; // top or bottom
  @Input() toastPosition: string = 'right'; // left, center, right
  @Input() toastClassName: string = 'default';
  @Input() toastDuration: number = 3000;
  @Input() toastClose: boolean = true;
  @Input() toastStyle: string = '';

  @HostListener('click') onClick(): void {
    Toastify({
      text: this.toastMessage,
      duration: this.toastDuration,
      gravity: this.toastGravity,
      position: this.toastPosition,
      className: this.toastClassName,
      close: this.toastClose,
      style: this.toastStyle ? JSON.parse(this.toastStyle) : undefined,
    }).showToast();
  }
}
