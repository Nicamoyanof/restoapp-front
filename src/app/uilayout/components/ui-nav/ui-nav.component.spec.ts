import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavComponent } from './ui-nav.component';

describe('UiNavComponent', () => {
  let component: UiNavComponent;
  let fixture: ComponentFixture<UiNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
