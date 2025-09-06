import { Component } from '@angular/core';
import {
  basicHeatmapChartOpts,
  HeatmapColorRangeChartOpts,
  HeatmapRangeShadesChartOpts,
  multipleSeriesHeatmapChartOpts,
} from './data'
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-heatmap',
  imports: [NgApexchartsModule],
  templateUrl: './heatmap.component.html',
  styles: ``
})
export class HeatmapComponent {
  basicHeatmapChart = basicHeatmapChartOpts
  multipleSeriesHeatmapChart = multipleSeriesHeatmapChartOpts
  HeatmapColorRangeChart = HeatmapColorRangeChartOpts
  HeatmapRangeShadesChart = HeatmapRangeShadesChartOpts
}
