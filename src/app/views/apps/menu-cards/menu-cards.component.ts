import { Component } from '@angular/core';
import { menuCards } from './data';
import GLightbox from 'glightbox';

@Component({
  selector: 'app-menu-cards',
  imports: [],
  templateUrl: './menu-cards.component.html',
  styles: ``
})
export class MenuCardsComponent {
  menuCards = menuCards;
  ngOnInit(): void {
    const lightbox = GLightbox({
      selector: '.image-popup',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }
}
