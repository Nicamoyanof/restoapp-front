import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnvoiceDetailComponent } from './onvoice-detail.component';

describe('OnvoiceDetailComponent', () => {
  let component: OnvoiceDetailComponent;
  let fixture: ComponentFixture<OnvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnvoiceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
