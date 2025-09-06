import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMAPComponent } from './google-map.component';

describe('GoogleMAPComponent', () => {
  let component: GoogleMAPComponent;
  let fixture: ComponentFixture<GoogleMAPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMAPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
