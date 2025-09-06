import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-maintenace',
  imports: [],
  templateUrl: './maintenace.component.html',
  styles: ``
})
export class MaintenaceComponent {
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'authentication-bg');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'authentication-bg');
  }
}
