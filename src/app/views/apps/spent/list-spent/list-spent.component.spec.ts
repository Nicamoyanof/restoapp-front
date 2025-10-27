import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpentComponent } from './list-spent.component';

describe('ListSpentComponent', () => {
  let component: ListSpentComponent;
  let fixture: ComponentFixture<ListSpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSpentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
