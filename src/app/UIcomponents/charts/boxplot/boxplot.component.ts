import { Component } from '@angular/core';
import {
  basicBoxplotChartOpts,
  horizontalBoxPlotChartOpts,
  scatterBoxplotChartOpts,
} from './data'
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-boxplot',
  imports: [NgApexchartsModule],
  templateUrl: './boxplot.component.html',
  styles: ``
})
export class BoxplotComponent {
  basicBoxplotChart = basicBoxplotChartOpts
  scatterBoxplotChart = scatterBoxplotChartOpts
  horizontalBoxPlotChart = horizontalBoxPlotChartOpts
}
