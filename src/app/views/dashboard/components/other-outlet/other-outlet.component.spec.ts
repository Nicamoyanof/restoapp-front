import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherOutletComponent } from './other-outlet.component';

describe('OtherOutletComponent', () => {
  let component: OtherOutletComponent;
  let fixture: ComponentFixture<OtherOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
