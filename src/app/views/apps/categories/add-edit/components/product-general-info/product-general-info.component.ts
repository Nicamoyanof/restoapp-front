import { Component } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider'
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';

@Component({
  selector: 'app-product-general-info',
  imports: [NouisliderModule, FormsModule, NgbRatingModule, SelectFormInputDirective],
  templateUrl: './product-general-info.component.html',
  styles: ``
})
export class ProductGeneralInfoComponent {
  priceRange: number[] = [5, 200];
  basicRating = 5
  rating = 3
  stepRating = 0
  currentRate = 2
  selected = 0
  hovered = 0
  hoverSelected = 1
  readonly = 0
  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`
  }
  ctrl = new FormControl<number | null>(null, Validators.required)


  basicSliderconfig = {
    behaviour: 'drag',
    connect: true,
    range: {
      min: [0],
      max: [255],
    },
  }
}
