import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { recentlyAssigned } from '../../data';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recently-assigned',
  imports: [CommonModule,NgbDropdownModule],
  templateUrl: './recently-assigned.component.html',
  styles: ``
})
export class RecentlyAssignedComponent {
  recentlyAssigned = recentlyAssigned
}
