import { Component } from '@angular/core';
import { RestaurantSettingsComponent } from "./components/restaurant-settings/restaurant-settings.component";
import { GeneralSettingComponent } from "./components/general-setting/general-setting.component";
import { SocialSettingComponent } from "./components/social-setting/social-setting.component";
import { CustomerSettingComponent } from "./components/customer-setting/customer-setting.component";
import { CategorySettingComponent } from "./components/category-setting/category-setting.component";
import { ReviewSettingComponent } from "./components/review-setting/review-setting.component";

@Component({
  selector: 'app-store-setting',
  imports: [RestaurantSettingsComponent, GeneralSettingComponent, SocialSettingComponent, CustomerSettingComponent, CategorySettingComponent, ReviewSettingComponent],
  templateUrl: './store-setting.component.html',
  styles: ``
})
export class StoreSettingComponent {

}
