import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalOrdersComponent } from './historical-orders.component';

describe('HistoricalOrdersComponent', () => {
  let component: HistoricalOrdersComponent;
  let fixture: ComponentFixture<HistoricalOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
