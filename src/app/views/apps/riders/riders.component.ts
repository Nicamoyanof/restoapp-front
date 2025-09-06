import { Component } from '@angular/core';
import { riders } from './data';

@Component({
  selector: 'app-riders',
  imports: [],
  templateUrl: './riders.component.html',
  styles: ``
})
export class RidersComponent {
  ridersData = riders
}
