import { Component } from '@angular/core';
import { StatsComponent } from "./components/stats/stats.component";
import { RevenueSummaryComponent } from "./components/revenue-summary/revenue-summary.component";
import { OrderChartComponent } from "./components/order-chart/order-chart.component";
import { DailyTrendingComponent } from "./components/daily-trending/daily-trending.component";
import { DeliveryChartComponent } from "./components/delivery-chart/delivery-chart.component";
import { SpecialMenuComponent } from "./components/special-menu/special-menu.component";
import { OtherOutletComponent } from "./components/other-outlet/other-outlet.component";
import { DeliveredStatusComponent } from "./components/delivered-status/delivered-status.component";

@Component({
  selector: 'app-dashboard',
  imports: [StatsComponent, RevenueSummaryComponent, OrderChartComponent, DailyTrendingComponent, DeliveryChartComponent, SpecialMenuComponent, OtherOutletComponent, DeliveredStatusComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
