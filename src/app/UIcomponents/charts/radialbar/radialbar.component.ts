import { Component } from '@angular/core';
import { basicRadialBarChartOpts, circleChartOpts, circleImageChartOpts, gradientCircularChartOpts, multipleRadialBarsChartOpts, semiCircleChartOpts, strokedCircularChartOpts } from './data';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-radialbar',
  imports: [NgApexchartsModule],
  templateUrl: './radialbar.component.html',
  styles: ``
})
export class RadialbarComponent {
  basicRadialBarChart = basicRadialBarChartOpts
  multipleRadialBarsChart = multipleRadialBarsChartOpts
  circleChart = circleChartOpts
  circleImageChart = circleImageChartOpts
  strokedCircularChart = strokedCircularChartOpts
  gradientCircularChart = gradientCircularChartOpts
  semiCircleChart = semiCircleChartOpts
}
