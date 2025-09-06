import { Component } from '@angular/core';
import { basicTreemapChartOpts, colorTreemapChartOpts, distributedTreemapChartOpts, multipleTreemapChartOpts } from './data';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-treemap',
  imports: [NgApexchartsModule],
  templateUrl: './treemap.component.html',
  styles: ``
})
export class TreemapComponent {
  basicTreemapChart = basicTreemapChartOpts
  multipleTreemapChart = multipleTreemapChartOpts
  distributedTreemapChart = distributedTreemapChartOpts
  colorTreemapChart = colorTreemapChartOpts
}
