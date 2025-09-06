import { Component, OnInit } from '@angular/core';
import { ProductPhotoComponent } from './components/product-photo/product-photo.component';
import { ProductGeneralInfoComponent } from './components/product-general-info/product-general-info.component';
import { CategoryProductService } from '@/app/services/category-product.service';

@Component({
  selector: 'app-add-edit',
  imports: [ProductPhotoComponent, ProductGeneralInfoComponent],
  templateUrl: './add-edit.component.html',
  styles: ``,
})
export class AddEditComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryProductService: CategoryProductService) {}

  ngOnInit(): void {
    this.categoryProductService
      .getCategoryProducts()
      .subscribe((categories: any) => {
        this.categories = categories;
      });
  }
}
