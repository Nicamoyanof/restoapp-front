import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperDirective } from '@core/directives/swiper-directive.component';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-special-discount',
  imports: [SwiperDirective],
  templateUrl: './special-discount.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpecialDiscountComponent {
  swiperConfig: SwiperOptions  = {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".testi-button-next",
      prevEl: ".testi-button-prev",
    },
    breakpoints: {
      355: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      450: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      540: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      868: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      929: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  }
}
