import { Component, HostListener, inject, Renderer2 } from '@angular/core';
import { RightSidebarComponent } from "./components/right-sidebar/right-sidebar.component";
import { MainNavComponent } from "./components/main-nav/main-nav.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { LayoutState } from '@store/layout/layout-reducers';
import { Store } from '@ngrx/store';
import { changesidebarsize } from '@store/layout/layout-action';
import { getSidebarsize } from '@store/layout/layout-selector';

@Component({
  selector: 'app-layout',
  imports: [MainNavComponent, TopbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {
  private store = inject(Store)
  private renderer = inject(Renderer2)
  previousSize: string = ''; 
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
    const windowWidth = window.innerWidth;
  
    const size = document.documentElement.getAttribute('data-menu-size') ?? '';
  
    if (windowWidth <= 1140) {
  
      this.store.dispatch(changesidebarsize({ size: 'hidden' }));
      document.documentElement.setAttribute('data-menu-size', 'hidden');
    } else {
      if (size === 'hidden') {
        
        const restoreState = this.previousSize === 'sm-hover-active' ? 'sm-hover-active' : 'sm-hover';
        this.store.dispatch(changesidebarsize({ size: restoreState }));
        document.documentElement.setAttribute('data-menu-size', restoreState);
      } else {
        
        this.store.dispatch(changesidebarsize({ size: size }));
        document.documentElement.setAttribute('data-menu-size', size);
        this.previousSize = size; 
      }
    }
  }
  
  
  onToggleMobileMenu() {
    this.store.select(getSidebarsize).subscribe((size: any) => {
      document.documentElement.setAttribute('data-menu-size', size);
    });
    const size = document.documentElement.getAttribute('data-menu-size');

    if (size == 'sm-hover') {
      this.store.dispatch(changesidebarsize({ size: 'sm-hover-active' }));
      document.documentElement.classList.add('sidebar-enable');
    } else {
      this.store.dispatch(changesidebarsize({ size: 'sm-hover' }));
      document.documentElement.classList.remove('sidebar-enable');
    }
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
