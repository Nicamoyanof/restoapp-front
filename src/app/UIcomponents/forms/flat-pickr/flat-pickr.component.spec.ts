import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatPickrComponent } from './flat-pickr.component';

describe('FlatPickrComponent', () => {
  let component: FlatPickrComponent;
  let fixture: ComponentFixture<FlatPickrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatPickrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatPickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
