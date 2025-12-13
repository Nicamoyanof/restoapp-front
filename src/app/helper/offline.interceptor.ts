import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OfflineQueueService } from '../services/offline-queue.service';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  constructor(private queue: OfflineQueueService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const method = req.method.toUpperCase();
    const isWrite =
      method === 'POST' ||
      method === 'PUT' ||
      method === 'PATCH' ||
      method === 'DELETE';

    if (!isWrite) return next.handle(req);

    // Si estás offline, encolar y devolver algo “optimista” o un error controlado
    if (!navigator.onLine) {
      return from(
        this.queue.enqueue({
          url: req.urlWithParams,
          method: method as any,
          body: req.body,
          headers: req.headers.keys().reduce((acc, k) => {
            acc[k] = req.headers.get(k) ?? '';
            return acc;
          }, {} as Record<string, string>),
        })
      ).pipe(
        switchMap(() => {
          // Opción A: devolvés un error “OFFLINE_QUEUED” para que tu UI lo trate como éxito local
          return throwError(
            () =>
              new HttpErrorResponse({ status: 0, statusText: 'OFFLINE_QUEUED' })
          );
          // Opción B: devolvés un Response fake (más complejo). Para empezar, mejor A.
        })
      );
    }

    // Si estás online pero la red se cae en el medio, encolar
    return next.handle(req).pipe(
      catchError((err: any) => {
        const isNetworkError =
          err instanceof HttpErrorResponse && err.status === 0;
        if (!isNetworkError) return throwError(() => err);

        return from(
          this.queue.enqueue({
            url: req.urlWithParams,
            method: method as any,
            body: req.body,
            headers: req.headers.keys().reduce((acc, k) => {
              acc[k] = req.headers.get(k) ?? '';
              return acc;
            }, {} as Record<string, string>),
          })
        ).pipe(
          switchMap(() =>
            throwError(
              () =>
                new HttpErrorResponse({
                  status: 0,
                  statusText: 'OFFLINE_QUEUED',
                })
            )
          )
        );
      })
    );
  }
}
