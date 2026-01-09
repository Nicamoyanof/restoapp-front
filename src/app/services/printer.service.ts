import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private http: HttpClient) {}

  getPrinters() {
    return this.http.get(
      'http://localhost:4100/api/InstaladorRestoApp/Printers'
    );
  }
  postTicket(body: any) {
    return this.http.post(
      'http://localhost:4100/api/InstaladorRestoApp/PrintOrder',
      body
    );
  }
}
