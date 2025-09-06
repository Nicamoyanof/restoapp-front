import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './store';
import { localStorageSyncReducer } from '@store/layout/layout-reducers';
import {
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(rootReducer, { metaReducers: [localStorageSyncReducer] }),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor, apiUrlInterceptor]),
      withFetch(),
      withInterceptorsFromDi()
    ),
    CookieService,
    provideEffects(AuthenticationEffects),
  ],
};
