import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ordersData } from '../../data';
import { CommonModule } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModal,
  NgbPaginationModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { TimeAgoPipe } from '@/app/pipes/time-ago.pipe';

@Component({
  selector: 'app-orders-summary',
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTooltip,
    TimeAgoPipe,
  ],
  templateUrl: './orders-summary.component.html',
  styles: ``,
})
export class OrdersSummaryComponent implements OnChanges {
  number!: number;
  @Input() ordersData: any[] = [];
  totalItems = 3;
  pageSize = 1;
  currentPage = 1;

  maxSize = 3;
  orderSelected: any = null;
  @Output() changeStatus = new EventEmitter<any>();

  constructor(private modalService: NgbModal) {}

  ngOnChanges(changes: any): void {
    console.log('Cambios detectados en ordersData:', changes);
  }
  getBadgeClasses(status: number): string[] {
    switch (status) {
      case 0:
        return ['border', 'border-warning', 'text-warning'];
      case 1:
        return ['border', 'border-primary', 'text-primary'];
      case 2:
        return ['border', 'border-info', 'text-info'];
      case 3:
        return ['bg-success'];
      case 4:
        return ['bg-danger'];
      default:
        return [];
    }
  }
  getDate(ts: number) {
    return new Date(ts);
  }
  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'En Preparación';
      case 2:
        return 'Entregado';
      case 3:
        return 'Cancelado';
      default:
        return status.toString();
    }
  }
  updateOrderStatus(order: any, item: any, newStatus: number) {
    this.changeStatus.emit({ order, item, newStatus });
  }

  openModal(content: any, options: any, order?: any) {
    this.orderSelected = order || null;
    this.modalService.open(content, options);
  }
  openNotesModal(content: any, order: any) {
    this.orderSelected = order;
    this.modalService.open(content, { centered: true });
  }
}
