import { Component } from '@angular/core';
import { RecentlyAssignedComponent } from "./components/recently-assigned/recently-assigned.component";
import { InProgressComponent } from "./components/in-progress/in-progress.component";
import { UpComingComponent } from "./components/up-coming/up-coming.component";
import { ApplicationDesignComponent } from "./components/application-design/application-design.component";

@Component({
  selector: 'app-todo',
  imports: [RecentlyAssignedComponent, InProgressComponent, UpComingComponent, ApplicationDesignComponent],
  templateUrl: './todo.component.html',
  styles: ``
})
export class TodoComponent {

}
