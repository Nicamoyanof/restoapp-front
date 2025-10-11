import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-orders-status',
  imports: [NgClass, NgStyle],
  templateUrl: './orders-status.component.html',
  styleUrls: ['./orders-status.component.scss'],
})
export class OrdersStatusComponent {
  @Input() orderStatusData: any[] = [];

  selectedStatus: number[] = [];
  @Output() statusChange = new EventEmitter<number[]>();

  onStatusChange(statusId: number, isChecked: boolean): void {
    if (statusId === 1) {
      this.selectedStatus = [];
    } else if (isChecked) {
      this.selectedStatus.push(statusId);
    } else {
      const index = this.selectedStatus.indexOf(statusId);
      if (index > -1) {
        this.selectedStatus.splice(index, 1);
      }
    }
    this.statusChange.emit(this.selectedStatus);
  }
}
