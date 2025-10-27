import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StockMovementService {
  constructor(private http: HttpClient) {}

  getStockMovements() {
    return this.http.get('/api/Stock/GetAllMovement');
  }

  addStockMovement(movement: any) {
    return this.http.post('/api/Stock/Purchase', movement);
  }
  getTotalItemStock() {
    return this.http.get('/api/Stock/GetTotalItemStock');
  }

  adjustmentStock(movement: any) {
    return this.http.post('/api/Stock/Adjustment', movement);
  }
}
