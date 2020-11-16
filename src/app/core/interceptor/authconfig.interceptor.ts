import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes('viacep')) {
      const authToken = this.authService.getToken();
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
    }
    return next.handle(req);
  }
}
