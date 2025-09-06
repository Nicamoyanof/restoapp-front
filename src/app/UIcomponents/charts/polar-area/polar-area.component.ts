import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-polar-area',
  imports: [NgApexchartsModule],
  templateUrl: './polar-area.component.html',
  styles: ``
})
export class PolarAreaComponent {
  basicPolarChartOpts: Partial<ChartOptions> = {
    series: [14, 23, 21, 17, 15, 10],
    chart: {
      height: 380,
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff'],
    },
    fill: {
      opacity: 0.8,
    },
    labels: ['Vote A', 'Vote B', 'Vote C', 'Vote D', 'Vote E', 'Vote F'],
    legend: {
      position: 'bottom',
    },
    colors:  ['#1e84c4', '#53389f', '#7f56da', '#ff86c8', '#ed5565', '#23c6c8'],
   
  }

  MonochromePolarChartOpts: Partial<ChartOptions> = {
    series: [42, 47, 52, 58, 65],
    chart: {
      height: 380,
      type: 'polarArea',
    },
    labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        color: '#727cf5',
        shadeIntensity: 0.6,
      },
    },
  }
}
