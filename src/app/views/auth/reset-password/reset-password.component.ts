import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink],
  templateUrl: './reset-password.component.html',
  styles: ``
})
export class ResetPasswordComponent {
 constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'authentication-bg');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'authentication-bg');
  }
}
