import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private http: HttpClient) {}

  getPrinters() {
    return this.http.get(
      'https://localhost:5100/api/InstaladorRestoApp/Printers'
    );
  }
  postTicket(body: any) {
    return this.http.post(
      'https://localhost:5100/api/InstaladorRestoApp/PrintOrder',
      body
    );
  }
}
