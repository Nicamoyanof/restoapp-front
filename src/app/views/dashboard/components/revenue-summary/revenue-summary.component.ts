import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-revenue-summary',
  imports: [NgbDropdownModule,NgApexchartsModule],
  templateUrl: './revenue-summary.component.html',
  styles: ``
})
export class RevenueSummaryComponent {
  orderSummary: Partial<ChartOptions> = {
    chart: {
      height: 262,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "rgba(170,184,197, 0.4)",
          strokeWidth: "67%",
          margin: 0,
        },

        dataLabels: {
          // showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            // formatter: function (val) {
            //   return val
            // },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#663ffa"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [100, 100],
      },
    },
    series: [75],
    stroke: {
      lineCap: "round",
    },
    labels: ["Archieved"],
  }
}
