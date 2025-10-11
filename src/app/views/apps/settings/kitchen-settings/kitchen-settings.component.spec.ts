import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenSettingsComponent } from './kitchen-settings.component';

describe('KitchenSettingsComponent', () => {
  let component: KitchenSettingsComponent;
  let fixture: ComponentFixture<KitchenSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
