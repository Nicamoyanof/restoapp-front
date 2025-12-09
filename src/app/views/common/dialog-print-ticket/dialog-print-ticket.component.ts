import { PrinterService } from '@/app/services/printer.service';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-print-ticket',
  imports: [DatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './dialog-print-ticket.component.html',
  styleUrl: './dialog-print-ticket.component.scss',
})
export class DialogPrintTicketComponent implements OnInit {
  @Input() modal: any;
  @Output() closeModal = new EventEmitter<string>();

  selectedTicketId: string = '';
  tickets: any[] = [];

  constructor(private readonly printerService: PrinterService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.printerService.getPrinters().subscribe((data: any) => {
      this.tickets = data;

      this.tickets.forEach((ticket) => {
        if (ticket.isDefault) {
          this.selectedTicketId = ticket.name;
        }
      });
    });
  }

  onTicketSelect(ticketId: string): void {
    this.selectedTicketId = ticketId;
  }
  printTicket(): void {
    this.closeModal.emit(this.selectedTicketId);
  }

  closeModalFunc() {
    this.closeModal.emit('close');
  }
}
