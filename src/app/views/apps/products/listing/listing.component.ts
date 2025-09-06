import { Component, OnInit } from '@angular/core';
import { ListingStatsComponent } from './components/listing-stats/listing-stats.component';
import { MenuProductComponent } from './components/menu-product/menu-product.component';
import { ProductService } from '@/app/services/product.service';
import { CategoryProductService } from '@/app/services/category-product.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-listing',
  imports: [ListingStatsComponent, MenuProductComponent, DropzoneModule],
  templateUrl: './listing.component.html',
  styles: ``,
})
export class ListingComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategoryProducts().subscribe((categories: any) => {
      this.categories = categories;
      this.productService.getProducts().subscribe((products: any) => {
        this.products = products.map((product: any) => {
          const category = this.categories.find(
            (cat) => cat.categoryId === product.categoryId
          );
          return {
            ...product,
            category: category ? category.name : 'Sin categoría',
          };
        });
      });
    });
  }

  reload() {}
}
