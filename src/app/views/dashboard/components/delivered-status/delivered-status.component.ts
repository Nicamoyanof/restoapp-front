import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { deliveredStatus } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivered-status',
  imports: [NgbDropdownModule,CommonModule],
  templateUrl: './delivered-status.component.html',
  styles: ``
})
export class DeliveredStatusComponent {
  deliveredStatus = deliveredStatus
}
