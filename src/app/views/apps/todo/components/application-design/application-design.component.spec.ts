import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDesignComponent } from './application-design.component';

describe('ApplicationDesignComponent', () => {
  let component: ApplicationDesignComponent;
  let fixture: ComponentFixture<ApplicationDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
