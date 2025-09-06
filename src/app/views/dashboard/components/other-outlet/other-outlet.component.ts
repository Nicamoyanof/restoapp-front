import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { outlet } from '../data';

@Component({
  selector: 'app-other-outlet',
  imports: [NgbDropdownModule,SimplebarAngularModule],
  templateUrl: './other-outlet.component.html',
  styles: ``
})
export class OtherOutletComponent {
  outlet = outlet
}
