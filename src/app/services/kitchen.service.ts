import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {
  constructor(private http: HttpClient) {}

  //api/Kitchen post y get all get, put y delte /{id}
  createKitchen(kitchen: any) {
    // Lógica para crear una nueva cocina
    return this.http.post('/api/Kitchen', kitchen);
  }

  getKitchens() {
    // Lógica para obtener todas las cocinas
    return this.http.get('/api/Kitchen');
  }

  updateKitchen(id: string, kitchen: any) {
    // Lógica para actualizar una cocina existente
    return this.http.put(`/api/Kitchen/${id}`, kitchen);
  }

  deleteKitchen(id: string) {
    // Lógica para eliminar una cocina
    return this.http.delete(`/api/Kitchen/${id}`);
  }

  getKitchenById(id: string) {
    // Lógica para obtener una cocina por su ID
    return this.http.get(`/api/Kitchen/${id}`);
  }
  updateKitchenShowOnMonitor(kitchenId: number, showOnMonitor: boolean) {
    // Lógica para actualizar la propiedad showOnMonitor de una cocina
    return this.http.put(`/api/Kitchen/ShowOnMonitor`, {
      kitchenId,
      showOnMonitor,
    });
  }
}
