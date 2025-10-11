import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LogoBoxComponent } from '../../../components/logo-box/logo-box.component';
import { changetheme } from '@store/layout/layout-action';
import { getLayoutColor } from '@store/layout/layout-selector';
import { LayoutState } from '@store/layout/layout-reducers';
import { Store } from '@ngrx/store';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [
    LogoBoxComponent,
    NgbDropdownModule,
    SimplebarAngularModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  @Output() mobileMenuButtonClicked = new EventEmitter();
  color!: string;
  store = inject(Store);
  name: any;
  picture: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.store.select('layout').subscribe((data: LayoutState) => {
      this.color = data.LAYOUT_THEME;
    });
    this.auth.user$.subscribe((profile: any) => {
      // console.log(profile);
      this.name = profile.name;
      this.picture = profile.picture;
    });
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit();
  }

  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme');
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }));
    } else {
      this.store.dispatch(changetheme({ color: 'light' }));
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color);
    });
  }

  logout() {
    localStorage.removeItem('client');
    this.auth.logout();
    this.router.navigate(['/auth/signin']);
  }
}
