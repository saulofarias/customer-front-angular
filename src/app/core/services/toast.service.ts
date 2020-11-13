import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  success(message) {
    this.show(message, {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }

  error(message) {
    this.show(message, {
      classname: 'bg-danger text-light',
      delay: 3000,
    });
  }
}
