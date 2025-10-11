// auth.guard.ts
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { from, of, Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const needToken = route.data?.['needToken'] === true;

  return auth.isAuthenticated$.pipe(
    take(1),
    switchMap((isAuth) => {
      if (!isAuth) {
        // redirige a Auth0; el guard debe devolver false para cortar la navegación
        return from(
          auth.loginWithRedirect({ appState: { target: state.url } })
        ).pipe(map((): boolean => false));
      }

      // Si la ruta requiere token listo antes de entrar
      if (needToken) {
        return from(auth.getAccessTokenSilently()).pipe(
          map((): boolean => true) // si se obtuvo el token, habilita
        );
      }

      return of(true);
    }),
    // Si algo falla, devolvemos una UrlTree válida (o false) → tipos correctos
    catchError((): Observable<boolean | UrlTree> => {
      const tree = router.createUrlTree(['/auth/signin'], {
        queryParams: { returnUrl: state.url },
      });
      return of(tree);
    })
  );
};
