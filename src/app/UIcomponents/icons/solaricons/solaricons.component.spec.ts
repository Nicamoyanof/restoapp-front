import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolariconsComponent } from './solaricons.component';

describe('SolariconsComponent', () => {
  let component: SolariconsComponent;
  let fixture: ComponentFixture<SolariconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolariconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolariconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
