import { Component } from '@angular/core';
import { HomeComponent } from "./component/home/home.component";
import { MenuComponent } from "./component/menu/menu.component";
import { SpecialDiscountComponent } from "./component/special-discount/special-discount.component";
import { VegComponent } from "./component/veg/veg.component";
import { OrderSummaryComponent } from "./component/order-summary/order-summary.component";

@Component({
  selector: 'app-pos',
  imports: [HomeComponent, MenuComponent, SpecialDiscountComponent, VegComponent, OrderSummaryComponent],
  templateUrl: './pos.component.html',
  styles: ``
})
export class PosComponent {

}
