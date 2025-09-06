import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicElementComponent } from './basic-element.component';

describe('BasicElementComponent', () => {
  let component: BasicElementComponent;
  let fixture: ComponentFixture<BasicElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
