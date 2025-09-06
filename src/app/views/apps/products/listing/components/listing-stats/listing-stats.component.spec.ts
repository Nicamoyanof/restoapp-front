import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingStatsComponent } from './listing-stats.component';

describe('ListingStatsComponent', () => {
  let component: ListingStatsComponent;
  let fixture: ComponentFixture<ListingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
