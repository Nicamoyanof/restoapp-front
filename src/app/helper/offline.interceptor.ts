import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OfflineQueueService } from '../services/offline-queue.service';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  constructor(private queue: OfflineQueueService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ✅ nunca tocar preflight
    if (req.method === 'OPTIONS') return next.handle(req);

    const method = req.method.toUpperCase();
    const isWrite =
      method === 'POST' ||
      method === 'PUT' ||
      method === 'PATCH' ||
      method === 'DELETE';
    if (!isWrite) return next.handle(req);

    const safeHeaders = req.headers.keys().reduce((acc, k) => {
      if (k.toLowerCase() === 'authorization') return acc; // ✅ no guardar token
      acc[k] = req.headers.get(k) ?? '';
      return acc;
    }, {} as Record<string, string>);

    const enqueueAndReturn202 = () =>
      from(
        this.queue.enqueue({
          url: req.urlWithParams,
          method: method as any,
          body: req.body,
          headers: safeHeaders,
        })
      ).pipe(
        switchMap(() =>
          // ✅ éxito local (evita reintentos y duplicados)
          of(new HttpResponse({ status: 202, body: { offlineQueued: true } }))
        )
      );

    // Offline: encolar y responder 202
    if (!navigator.onLine) {
      return enqueueAndReturn202();
    }

    // Online: enviar, si falla por red -> encolar y responder 202
    return next.handle(req).pipe(
      catchError((err: any) => {
        const isNetworkError =
          err instanceof HttpErrorResponse && err.status === 0;
        if (!isNetworkError) return throwError(() => err);
        return enqueueAndReturn202();
      })
    );
  }
}
