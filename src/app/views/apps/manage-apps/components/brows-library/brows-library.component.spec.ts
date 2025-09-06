import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsLibraryComponent } from './brows-library.component';

describe('BrowsLibraryComponent', () => {
  let component: BrowsLibraryComponent;
  let fixture: ComponentFixture<BrowsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
