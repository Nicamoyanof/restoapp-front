import { Component } from '@angular/core';
import { posHome } from '../../data';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styles: ``
})

export class MenuComponent {
  posHome = posHome
}
