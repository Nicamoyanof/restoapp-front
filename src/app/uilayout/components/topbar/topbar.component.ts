import { Component, EventEmitter, inject, Output } from '@angular/core';
import { LogoBoxComponent } from "../../../components/logo-box/logo-box.component";
import { changetheme } from '@store/layout/layout-action';
import { getLayoutColor } from '@store/layout/layout-selector';
import { LayoutState } from '@store/layout/layout-reducers';
import { Store } from '@ngrx/store';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-topbar',
  imports: [LogoBoxComponent,NgbDropdownModule,SimplebarAngularModule],
  templateUrl: './topbar.component.html',
  styles: ``
})
export class TopbarComponent {
  @Output() mobileMenuButtonClicked = new EventEmitter()
  color!: string
  store = inject(Store)

  ngOnInit(): void {
    this.store.select('layout').subscribe((data: LayoutState) => {
      this.color = data.LAYOUT_THEME
    })
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }

  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme')
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }))
    } else {
      this.store.dispatch(changetheme({ color: 'light' }))
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }

}
