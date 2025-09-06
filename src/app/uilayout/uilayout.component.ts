import { Component, HostListener, inject, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { changesidebarsize } from '@store/layout/layout-action';
import { LayoutState } from '@store/layout/layout-reducers';
import { getSidebarsize } from '@store/layout/layout-selector';
import { TopbarComponent } from "../layout/components/topbar/topbar.component";
import { FooterComponent } from "../layout/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { UiNavComponent } from './components/ui-nav/ui-nav.component';

@Component({
  selector: 'app-uilayout',
  imports: [TopbarComponent, FooterComponent,RouterOutlet,UiNavComponent],
  templateUrl: './uilayout.component.html',
  styles: ``
})
export class UilayoutComponent {
  private store = inject(Store)
  private renderer = inject(Renderer2)

  ngOnInit(): void {

    this.store.select('layout').subscribe((data: LayoutState) => {
      document.documentElement.setAttribute('data-bs-theme', data.LAYOUT_THEME)

      document.documentElement.setAttribute('data-menu-color', data.MENU_COLOR)
      document.documentElement.setAttribute(
        'data-topbar-color',
        data.TOPBAR_COLOR
      )
      document.documentElement.setAttribute('data-menu-size', data.MENU_SIZE)
    })
    this.onResize()

  }

  @HostListener('window:resize')
  onResize() {
    let size = document.documentElement.getAttribute('data-menu-size') ?? ''; // Ensure it's always a string
    const windowWidth = window.innerWidth;
  
    if (windowWidth <= 1140) {
      // Set sidebar to "hidden" when the screen is small
      this.store.dispatch(changesidebarsize({ size: 'hidden' }));
    } else {
      // Reset to a default size when the screen is large
      const newSize = size === 'hidden' ? 'sm-hover' : size;
      this.store.dispatch(changesidebarsize({ size: newSize }));
    }
  }
  

  onToggleMobileMenu() {
    this.store.select(getSidebarsize).subscribe((size: any) => {
      document.documentElement.setAttribute('data-menu-size', size)
    })
    const size = document.documentElement.getAttribute('data-menu-size')

    if (size == 'sm-hover') {
      this.store.dispatch(changesidebarsize({ size: 'sm-hover-active' }))
    } else {
      this.store.dispatch(changesidebarsize({ size: 'sm-hover' }))
    }
    document.documentElement.classList.toggle('sidebar-enable')

  
  }

  showBackdrop() {
    const backdrop = this.renderer.createElement('div')
    this.renderer.addClass(backdrop, 'offcanvas-backdrop')
    this.renderer.addClass(backdrop, 'fade')
    this.renderer.addClass(backdrop, 'show')
    this.renderer.appendChild(document.body, backdrop)
    this.renderer.setStyle(document.body, 'overflow', 'hidden')

    if (window.innerWidth > 1040) {
      this.renderer.setStyle(document.body, 'paddingRight', '15px')
    }

    this.renderer.listen(backdrop, 'click', () => {
      document.documentElement.classList.remove('sidebar-enable')
      this.renderer.removeChild(document.body, backdrop)
      this.renderer.setStyle(document.body, 'overflow', null)
      this.renderer.setStyle(document.body, 'paddingRight', null)
    })
  }
}
