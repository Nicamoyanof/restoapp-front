import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestaurantTablesService {
  constructor(private readonly http: HttpClient) {}

  // Aquí puedes agregar métodos para interactuar con la API relacionada con las mesas del restaurante
  getTables() {
    return this.http.get('/api/Table');
  }

  addTable(table: any) {
    return this.http.post('/api/Table', table);
  }

  updateTable(table: any) {
    //si el estado es ocupada /Occupy, esperando pago /WaitingPayment, libre de nuevo Release, fuera de servicio /OutOfService, reservada /Reserve . asi deberia finalizar la request
    // ejemplo return this.http.put(`/api/Table/${table.id}/Occupy`, table);
    if (table.status === 2) {
      return this.http.put(`/api/Table/${table.id}/Occupy`, {});
    } else if (table.status === 3) {
      return this.http.put(`/api/Table/${table.id}/WaitingPayment`, {});
    } else if (table.status === 0) {
      return this.http.put(`/api/Table/${table.id}/Release`, {});
    } else if (table.status === 4) {
      return this.http.put(`/api/Table/${table.id}/OutOfService`, {});
    } else if (table.status === 1) {
      return this.http.put(`/api/Table/${table.id}/Reserve`, {});
    }
    return this.http.put(`/api/Table/${table.id}/Release`, {});
  }

  deleteTable(id: number) {
    return this.http.delete(`/api/Table/${id}`);
  }

  freeTable(tableId: number, body: any) {
    return this.http.put(`/api/Table/${tableId}/Release`, body);
  }

  outOfServiceTable(tableId: number, body: any) {
    return this.http.put(`/api/Table/${tableId}/OutOfService`, body);
  }
}
