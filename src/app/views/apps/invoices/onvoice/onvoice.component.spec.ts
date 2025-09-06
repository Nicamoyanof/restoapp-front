import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnvoiceComponent } from './onvoice.component';

describe('OnvoiceComponent', () => {
  let component: OnvoiceComponent;
  let fixture: ComponentFixture<OnvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
