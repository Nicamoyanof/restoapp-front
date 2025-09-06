import { Component } from '@angular/core';
import { CategoriesListingComponent } from './components/categories-listing/categories-listing.component';
import { TotalCategoriesComponent } from './components/total-categories/total-categories.component';
import { CategoryProductService } from '@/app/services/category-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listing',
  imports: [CategoriesListingComponent, TotalCategoriesComponent],
  templateUrl: './listing.component.html',
  styles: ``,
})
export class CategoryListingComponent {
  totalCategories: any[] = [];
  constructor(private categoryProductService: CategoryProductService) {}

  ngOnInit() {
    this.categoryProductService.getCategoryProducts().subscribe((data: any) => {
      this.totalCategories = data;
    });
  }

  reload(event: any) {
    this.categoryProductService.getCategoryProducts().subscribe((data: any) => {
      this.totalCategories = data;
    });
  }
}
