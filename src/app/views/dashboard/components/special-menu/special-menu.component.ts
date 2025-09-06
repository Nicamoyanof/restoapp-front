import { Component } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { specialMenu } from '../data';

@Component({
  selector: 'app-special-menu',
  imports: [SimplebarAngularModule],
  templateUrl: './special-menu.component.html',
  styles: ``
})
export class SpecialMenuComponent {
  specialMenu = specialMenu
}
