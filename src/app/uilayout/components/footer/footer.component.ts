import { Component } from '@angular/core';
import { currentYear } from '../../../common/constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
year = currentYear
}
