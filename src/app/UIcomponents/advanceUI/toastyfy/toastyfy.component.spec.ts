import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastyfyComponent } from './toastyfy.component';

describe('ToastyfyComponent', () => {
  let component: ToastyfyComponent;
  let fixture: ComponentFixture<ToastyfyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastyfyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastyfyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
