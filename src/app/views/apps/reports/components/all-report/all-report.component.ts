import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { allReportData } from '../../data';

@Component({
  selector: 'app-all-report',
  imports: [NgbDropdownModule],
  templateUrl: './all-report.component.html',
  styles: ``
})
export class AllReportComponent {
  allReportData = allReportData
}
