import { Component } from '@angular/core';
import { ReportStatsComponent } from "./components/report-stats/report-stats.component";
import { AllReportComponent } from "./components/all-report/all-report.component";

@Component({
  selector: 'app-reports',
  imports: [ReportStatsComponent, AllReportComponent],
  templateUrl: './reports.component.html',
  styles: ``
})
export class ReportsComponent {

}
