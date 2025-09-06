import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDiscountComponent } from './special-discount.component';

describe('SpecialDiscountComponent', () => {
  let component: SpecialDiscountComponent;
  let fixture: ComponentFixture<SpecialDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
