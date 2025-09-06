import { Component } from '@angular/core';
import { categoryList } from '../../data';

@Component({
  selector: 'app-categories-listing',
  imports: [],
  templateUrl: './categories-listing.component.html',
  styles: ``
})
export class CategoriesListingComponent {
  categoryListData = categoryList
}
