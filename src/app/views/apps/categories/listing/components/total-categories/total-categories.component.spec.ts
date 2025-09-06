import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCategoriesComponent } from './total-categories.component';

describe('TotalCategoriesComponent', () => {
  let component: TotalCategoriesComponent;
  let fixture: ComponentFixture<TotalCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
