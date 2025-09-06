import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collapse',
  imports: [NgbCollapseModule],
  templateUrl: './collapse.component.html',
  styles: ``
})
export class CollapseComponent {
  isCollapsed = true
  isHorizontal = true
  isFirstToggle = true
  isSecondToggle = true
}
