import { Component } from '@angular/core';
import GLightbox from 'glightbox';
@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styles: ``
})
export class GalleryComponent {
  ngOnInit(): void {
    const lightbox = GLightbox({
      selector: '.image-popup', // Add your custom selector here
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }
}
