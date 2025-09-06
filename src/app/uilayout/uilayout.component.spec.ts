import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UilayoutComponent } from './uilayout.component';

describe('UilayoutComponent', () => {
  let component: UilayoutComponent;
  let fixture: ComponentFixture<UilayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UilayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UilayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
