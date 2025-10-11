import { Component, OnInit } from '@angular/core';
import { RestaurantSettingsComponent } from './components/restaurant-settings/restaurant-settings.component';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { SocialSettingComponent } from './components/social-setting/social-setting.component';
import { CustomerSettingComponent } from './components/customer-setting/customer-setting.component';
import { CategorySettingComponent } from './components/category-setting/category-setting.component';
import { ReviewSettingComponent } from './components/review-setting/review-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '@/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-setting',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './store-setting.component.html',
  styles: ``,
})
export class StoreSettingComponent implements OnInit {
  storeName = '';
  isEdit = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.client$.subscribe((client) => {
      if (client) {
        this.storeName = client.name;
        this.isEdit = true;
      } else {
        this.storeName = '';
        this.isEdit = false;
      }
    });
  }

  saveChanges() {
    if (!this.isEdit) {
      this.clientService.createClient(this.storeName).subscribe(() => {
        this.isEdit = true;
        this.clientService.getClient();
        // agregar  swetalert
        Swal.fire({
          title: 'Éxito',
          text: 'Tienda creada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      });
    } else {
      this.clientService
        .updateStoreName(this.storeName, this.clientService.getClientId())
        .subscribe(() => {
          this.isEdit = false;
          // agregar  swetalert
          Swal.fire({
            title: 'Éxito',
            text: 'Tienda actualizada exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        });
    }
  }
}
