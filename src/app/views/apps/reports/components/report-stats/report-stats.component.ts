import { Component } from '@angular/core';
import { reportStats } from '../../data';

@Component({
  selector: 'app-report-stats',
  imports: [],
  templateUrl: './report-stats.component.html',
  styles: ``
})
export class ReportStatsComponent {
  reportStats = reportStats
}
