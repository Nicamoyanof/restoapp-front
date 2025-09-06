import { Component } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { NouisliderModule } from 'ng2-nouislider'

@Component({
  selector: 'app-input-mask',
  imports: [NgxMaskDirective,NouisliderModule],
  templateUrl: './input-mask.component.html',
  providers: [provideNgxMask()],
  styles: ``
})
export class InputMaskComponent {

}
