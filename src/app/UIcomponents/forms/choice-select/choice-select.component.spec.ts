import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceSelectComponent } from './choice-select.component';

describe('ChoiceSelectComponent', () => {
  let component: ChoiceSelectComponent;
  let fixture: ComponentFixture<ChoiceSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
