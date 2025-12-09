import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrintTicketComponent } from './dialog-print-ticket.component';

describe('DialogPrintTicketComponent', () => {
  let component: DialogPrintTicketComponent;
  let fixture: ComponentFixture<DialogPrintTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPrintTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrintTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
