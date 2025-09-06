import { Component } from '@angular/core';
import {
  allMixedChartOpts,
  lineAreaChartOpts,
  lineColumnMixedChartOpts,
  multipleChartOpts,
} from './data'
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-mixed',
  imports: [NgApexchartsModule],
  templateUrl: './mixed.component.html',
  styles: ``
})
export class MixedComponent {
  lineColumnMixedChart = lineColumnMixedChartOpts
  multipleChart = multipleChartOpts
  lineAreaChart = lineAreaChartOpts
  allMixedChart = allMixedChartOpts
}
