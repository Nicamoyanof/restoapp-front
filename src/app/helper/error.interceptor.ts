import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router, { optional: true });
  // const effects = inject(AuthenticationEffects); // sólo si lo usás

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth.removeSession();
        // Preferible navegar si tu app es SPA; si no tenés Router, recargá.
        if (router) {
          router.navigateByUrl('/login');
        } else {
          window.location.reload();
        }
      }

      const message =
        (err.error && (err.error.message || err.error.error)) ||
        err.statusText ||
        'Error de red';

      // En RxJS 7+: throwError recibe una factory
      return throwError(() => new Error(message));
    })
  );
};
