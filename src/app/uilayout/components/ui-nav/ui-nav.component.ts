import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { basePath } from '@common/constants';
import { COMPONENT_MENU, MenuItemType } from '@common/menu-meta';
import { findAllParent, findMenuItem } from '@common/utils';
import { LogoBoxComponent } from '@components/logo-box/logo-box.component';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-ui-nav',
  imports: [
    SimplebarAngularModule,
    CommonModule,
    RouterLink,
    NgbCollapseModule,
    LogoBoxComponent,
  ],
  templateUrl: './ui-nav.component.html',
  styles: ``,
})
export class UiNavComponent {
  menuItems: MenuItemType[] = [];
  activeMenuItems: string[] = [];

  router = inject(Router);
  trimmedURL = this.router.url?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  );

  constructor() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.trimmedURL = this.router.url?.replaceAll(
          basePath !== '' ? basePath + '/' : '',
          '/'
        );
        this._activateMenu();
      }
    });
  }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu(): void {
    this.menuItems = COMPONENT_MENU;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu();
    });
  }

  /**
   * toggles open menu
   * @param menuItem clicked menuitem
   * @param collapse collpase instance
   */
  toggleMenuItem(menuItem: MenuItemType, collapse: NgbCollapse): void {
    collapse.toggle();
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem['key'],
        ...findAllParent(this.menuItems, menuItem),
      ];
      this.menuItems.forEach((menu: MenuItemType) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      });
    }
  }

  hasSubmenu(menu: MenuItemType): boolean {
    return menu.submenu ? true : false;
  }

  _activateMenu(): void {
    const div = document.querySelector('.main-nav');

    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName('nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (
          this.trimmedURL === items[i].pathname ||
          (this.trimmedURL.startsWith('/invoice/') &&
            items[i].pathname === '/invoice/RB6985') ||
          (this.trimmedURL.startsWith('/ecommerce/product/') &&
            items[i].pathname === '/ecommerce/product/1')
        ) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('aria-controls');
        const activeMt = findMenuItem(this.menuItems, mid);

        if (activeMt) {
          const matchingObjs = [
            activeMt['key'],
            ...findAllParent(this.menuItems, activeMt),
          ];

          this.activeMenuItems = matchingObjs;
          this.menuItems.forEach((menu: MenuItemType) => {
            menu.collapsed = !matchingObjs.includes(menu.key!);
          });
        }
      }
    }
  }
}
