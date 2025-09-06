import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTrendingComponent } from './daily-trending.component';

describe('DailyTrendingComponent', () => {
  let component: DailyTrendingComponent;
  let fixture: ComponentFixture<DailyTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTrendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
