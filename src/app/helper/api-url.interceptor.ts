// api-url.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

const API_URL = 'http://localhost:4100'; // 👉 cambiá por el de tu backend

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Sólo modificar si la URL es relativa (no absoluta)
  if (!req.url.startsWith('http') && !req.url.includes('api/login')) {
    const apiReq = req.clone({
      url: `${API_URL}${req.url}`,
    });
    return next(apiReq);
  }
  return next(req);
};
