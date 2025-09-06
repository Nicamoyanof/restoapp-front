import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-stats',
  imports: [NgApexchartsModule],
  templateUrl: './stats.component.html',
  styles: ``
})
export class StatsComponent {
  salesFunnel: Partial<ChartOptions> = {
    chart: {
      type: "area",
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
    stroke: {
      width: 0,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    markers: {
      size: 0,
    },
    colors: ["#4d5761"],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  }

  orderFunnel: Partial<ChartOptions> = {
    chart: {
      type: "bar",
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: [17, 83, 56, 45, 29, 92, 38, 72, 11, 67, 53, 29, 92, 18, 16, 11, 8, 5, 25, 83, 56, 45, 72, 11, 67, 53, 29, 92],
      },
    ],
    stroke: {
      width: 0,
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "25%",
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },

    markers: {
      size: 0,
    },
    colors: ["#663ffa"],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  }

  cancelFunnel: Partial<ChartOptions> = {
    chart: {
      type: "area",
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: [45, 12, 78, 31, 56, 89, 22, 67, 41, 53, 96],
      },
    ],
    stroke: {
      width: 0,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    markers: {
      size: 0,
    },
    colors: ["#4d5761"],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  }
}

