import { Component } from '@angular/core';
import { AuthorisedAppsComponent } from "./components/authorised-apps/authorised-apps.component";
import { BrowsLibraryComponent } from "./components/brows-library/brows-library.component";

@Component({
  selector: 'app-manage-apps',
  imports: [AuthorisedAppsComponent, BrowsLibraryComponent],
  templateUrl: './manage-apps.component.html',
  styles: ``
})
export class ManageAppsComponent {

}
