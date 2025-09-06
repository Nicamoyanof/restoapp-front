import { Component } from '@angular/core';
import { trendingData } from '../data';

@Component({
  selector: 'app-daily-trending',
  imports: [],
  templateUrl: './daily-trending.component.html',
  styles: ``
})
export class DailyTrendingComponent {
  trendingData = trendingData
}
