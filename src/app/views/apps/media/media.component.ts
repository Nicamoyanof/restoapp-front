import { Component } from '@angular/core';
import { mediaData } from './data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styles: ``
})
export class MediaComponent {
  mediaData = mediaData;
  
}
