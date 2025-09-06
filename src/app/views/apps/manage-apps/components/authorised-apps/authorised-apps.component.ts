import { Component } from '@angular/core';
import { authorisedApps } from '../data';

@Component({
  selector: 'app-authorised-apps',
  imports: [],
  templateUrl: './authorised-apps.component.html',
  styles: ``
})
export class AuthorisedAppsComponent {
  authorisedApps = authorisedApps
}
