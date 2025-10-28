import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './store';
import { localStorageSyncReducer } from '@store/layout/layout-reducers';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { jwtInterceptor } from './helper/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationEffects } from '@store/authentication/authentication.effects';
import { errorInterceptor } from './helper/error.interceptor';
import { apiUrlInterceptor } from './helper/api-url.interceptor';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { spinnerInterceptor } from './helper/spinner.interceptor';
import { environment } from '@environment/environment.development';
import { provideNgxMask } from 'ngx-mask';
import { provideServiceWorker } from '@angular/service-worker';

registerLocaleData(localeEsAR);

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', { enabled: true }),
    provideRouter(routes),
    provideStore(rootReducer, { metaReducers: [localStorageSyncReducer] }),
    provideEffects(AuthenticationEffects),
    provideNgxMask(),

    // 👉 HttpClient: funcionales aquí + habilitar DI
    provideHttpClient(
      withInterceptors([
        spinnerInterceptor, // HttpInterceptorFn
        // errorInterceptor, // HttpInterceptorFn
        apiUrlInterceptor, // HttpInterceptorFn
        // ⚠️ NO pongas AuthHttpInterceptor acá (es de clase)
        // ⚠️ NO pongas jwtInterceptor si usás el de Auth0
      ]),
      withFetch(),
      withInterceptorsFromDi() // ← necesario para usar interceptores de CLASE
    ),

    // 👉 Registrar el interceptor de Auth0 por DI
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },

    // 👉 Config Auth0 (con cache y refresh token)
    provideAuth0({
      domain: 'dev-w1bl5owcn51l2yqv.us.auth0.com',
      clientId: 'svFOPUICh7c5ch0VmVHoZvumsEant9Ic',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.audience, // <-- tu audience real
        scope: 'openid profile email',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      useRefreshTokensFallback: true,
      httpInterceptor: {
        allowedList: [
          // usa la misma base que arma tu apiUrlInterceptor / environment
          { uri: `${environment.apiBaseUrl}/api/*` },
          // si en dev pegás a localhost:
          { uri: 'http://localhost:5099/api/*' },
          { uri: 'https://localhost:7099/api/*' },
        ],
      },
    }),

    CookieService,
    { provide: LOCALE_ID, useValue: 'es-AR' },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
