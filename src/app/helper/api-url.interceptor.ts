// api-url.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environment/environment';

const API_URL = environment.apiBaseUrl; // 👉 cambiá por el de tu backend

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Sólo modificar si la URL es relativa (no absoluta)
  if (
    !req.url.startsWith('http') &&
    !req.url.includes('api/login') &&
    !req.url.includes('InstaladorRestoApp')
  ) {
    const apiReq = req.clone({
      url: `${API_URL}${req.url}`,
    });

    if (req.method != 'GET') {
      // console.log('API URL Interceptor - Modifying request:', apiReq);
      apiReq.headers.append('ngsw-bypass', 'true');
      // headers: req.headers.set('ngsw-bypass', 'true'),
    }

    return next(apiReq);
  }
  return next(req);
};
