import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-order-chart',
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './order-chart.component.html',
  styles: ``
})
export class OrderChartComponent {
  orderChart: Partial<ChartOptions> = {
    chart: {
      height: 269,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "30%",
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "+";
      },
      offsetY: -25,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    colors: ["#4d5761"],
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: -5,
    },
    series: [
      {
        name: "Total Order",
        data: [37, 43, 40, 51, 45, 23, 54],
      },
    ],
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      position: "bottom",
      labels: {
        offsetY: 0,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },

      tooltip: {
        enabled: true,
        offsetY: -10,
      },
    },

    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "+";
        },
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#f1f3fa",
    },
  }
}
