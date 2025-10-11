import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _isLoading = new EventEmitter<boolean>(false);

  constructor() {}

  //necesito que el getter sea un observable para que se actualice en tiempo real
  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  show(): void {
    this._isLoading.emit(true);
  }

  hide(): void {
    this._isLoading.emit(false);
  }
}
