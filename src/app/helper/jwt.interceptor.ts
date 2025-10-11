import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from '@core/services/auth.service';
import { catchError, map, of, switchMap, take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Evitá adjuntar token a llamadas a Auth0, assets o rutas públicas
  const isApi = req.url.startsWith('/api'); // o usá environment.apiUrl
  if (!isApi) return next(req);

  return auth.isAuthenticated$.pipe(
    take(1),
    switchMap((isAuth) => {
      if (!isAuth) return of<string | null>(null);

      return auth
        .getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://dev-w1bl5owcn51l2yqv.us.auth0.com/api/v2/',
            scope: 'openid profile email',
          },
          cacheMode: 'off', // fuerza emitir uno nuevo (evita token viejo opaco)
        })
        .pipe(
          take(1),
          map((token) => token),
          catchError((err) => {
            console.error('Error fetching access token', err);
            return of(null);
          })
        );
    }),
    map((token) =>
      token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req
    ),
    switchMap((authReq: HttpRequest<any>) => next(authReq)),
    // Si falla la obtención del token, mandamos la request sin auth (o podés redirigir a login)
    catchError(() => next(req))
  );
};
