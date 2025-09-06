import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-delivery-chart',
  imports: [NgbDropdownModule, NgApexchartsModule],
  templateUrl: './delivery-chart.component.html',
  styles: ``
})
export class DeliveryChartComponent {

  generateData(
    count: number,
    yrange: { max: number; min: number }
  ) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }

  basicHeatmap: Partial<ChartOptions> = {
    chart: {
      toolbar: {
        show: false,
      },
      height: 269,
      type: "heatmap",
    },

    dataLabels: {
      enabled: false,
    },
    colors: ["#663ffa"],
    series: [
      {
        name: "Food",
        data: [
          {
            x: "Sun",
            y: 22,
          },
          {
            x: "Mon",
            y: 29,
          },
          {
            x: "Tue",
            y: 13,
          },
          {
            x: "Wed",
            y: 32,
          },

          {
            x: "Thu",
            y: 32,
          },
          {
            x: "Fri",
            y: 32,
          },
          {
            x: "Sat",
            y: 32,
          },
        ],
      },
      {
        name: "Beverage",
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Snack",
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Hot Drinks",
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Veg Food",
        data: this.generateData(7, {
          min: 0,
          max: 90,
        }),
      },
    ],

    xaxis: {
      type: "category",
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px", // Increase font size for y-axis labels
        },
      },
    },
  }
}
