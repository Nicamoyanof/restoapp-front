import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDirectionComponent } from './location-direction.component';

describe('LocationDirectionComponent', () => {
  let component: LocationDirectionComponent;
  let fixture: ComponentFixture<LocationDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDirectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
