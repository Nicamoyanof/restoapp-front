import { Component } from '@angular/core';
import { browsLibrary } from '../data';

@Component({
  selector: 'app-brows-library',
  imports: [],
  templateUrl: './brows-library.component.html',
  styles: ``
})
export class BrowsLibraryComponent {
  browsLibrary = browsLibrary
}
