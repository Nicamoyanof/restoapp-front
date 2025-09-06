import { Component } from '@angular/core';
import { LocationHomeComponent } from "./components/location-home/location-home.component";
import { LocationListComponent } from "./components/location-list/location-list.component";
import { LocationDirectionComponent } from "./components/location-direction/location-direction.component";

@Component({
  selector: 'app-locations',
  imports: [LocationHomeComponent, LocationListComponent, LocationDirectionComponent],
  templateUrl: './locations.component.html',
  styles: ``
})
export class LocationsComponent {

}
