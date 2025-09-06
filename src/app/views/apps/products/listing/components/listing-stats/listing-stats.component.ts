import { Component } from '@angular/core';
import { listingStats } from '../../data';

@Component({
  selector: 'app-listing-stats',
  imports: [],
  templateUrl: './listing-stats.component.html',
  styles: ``
})
export class ListingStatsComponent {
  listingStats = listingStats
}
