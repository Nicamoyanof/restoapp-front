import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountStockComponent } from './count-stock.component';

describe('CountStockComponent', () => {
  let component: CountStockComponent;
  let fixture: ComponentFixture<CountStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
