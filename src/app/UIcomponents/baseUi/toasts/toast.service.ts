import { Injectable, TemplateRef } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ToastifyDirective } from '@core/directives/toastify.diretive';

export type Toast = {
  content: string;
  gravity: 'top' | 'bottom';
  position: 'right' | 'left' | 'center';
  className:
    | 'bg-primary'
    | 'bg-secondary'
    | 'bg-success'
    | 'bg-danger'
    | 'bg-warning'
    | 'bg-info'
    | 'bg-light'
    | 'bg-dark'
    | '';
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  constructor(private toastifyService: ToastifyDirective) {}

  show(toast: Toast) {
    this.toasts.push(toast);
    setTimeout(() => this.remove(toast), 3000);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
  // showToast(toast: Toast) {
  //   // this.toasts.push(toast);
  // }

  // showToast(toast: Toast) {
  //   // this.toasts = this.toasts.filter((t) => t !== toast);
  // }
}
