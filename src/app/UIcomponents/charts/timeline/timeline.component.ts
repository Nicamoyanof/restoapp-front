import { Component } from '@angular/core';
import {
  advancedTimelineChartOpts,
  basicTimelineChartOpts,
  distributedTimelineChartOpts,
  groupTimelineChartOpts,
  multiSeriesTimelineChartOpts,
} from './data'
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-timeline',
  imports: [NgApexchartsModule],
  templateUrl: './timeline.component.html',
  styles: ``
})
export class TimelineComponent {
  basicTimelineChart = basicTimelineChartOpts
  distributedTimelineChart = distributedTimelineChartOpts
  multiSeriesTimelineChart = multiSeriesTimelineChartOpts
  advancedTimelineChart = advancedTimelineChartOpts
  groupTimelineChart = groupTimelineChartOpts
}
