import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedAppsComponent } from './authorised-apps.component';

describe('AuthorisedAppsComponent', () => {
  let component: AuthorisedAppsComponent;
  let fixture: ComponentFixture<AuthorisedAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorisedAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorisedAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
