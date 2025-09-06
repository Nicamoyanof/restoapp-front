import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatComponent } from './customer-stat.component';

describe('CustomerStatComponent', () => {
  let component: CustomerStatComponent;
  let fixture: ComponentFixture<CustomerStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
