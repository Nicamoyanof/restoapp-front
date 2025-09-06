import { Component } from '@angular/core';
import { offers } from './data';

@Component({
  selector: 'app-offers',
  imports: [],
  templateUrl: './offers.component.html',
  styles: ``
})
export class OffersComponent {
  offersData = offers
  offers = [
    { image: 'assets/images/food-icon/offer-1.png', alt: 'Offer 1' },
    { image: 'assets/images/food-icon/offer-2.png', alt: 'Offer 2' },
    { image: 'assets/images/food-icon/offer-3.png', alt: 'Offer 3' }
  ];
}
