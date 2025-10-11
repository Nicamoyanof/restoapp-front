import { Component, OnInit } from '@angular/core';
import { ListingStatsComponent } from './components/listing-stats/listing-stats.component';
import { MenuProductComponent } from './components/menu-product/menu-product.component';
import { ProductService } from '@/app/services/product.service';
import { CategoryProductService } from '@/app/services/category-product.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing',
  imports: [
    ListingStatsComponent,
    MenuProductComponent,
    DropzoneModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './listing.component.html',
  styles: ``,
})
export class ListingComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  formGroup: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryProductService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      categoryId: [null],
    });
  }

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
        this.filteredProducts = [...this.products];
      });
    });

    this.formGroup.valueChanges.subscribe((values: any) => {
      this.filteredProducts = [...this.products].filter((product) => {
        return (
          (values.name
            ? product.name.toLowerCase().includes(values.name.toLowerCase())
            : true) &&
          (values.categoryId ? product.categoryId == values.categoryId : true)
        );
      });
    });
  }

  reload() {}

  deleteProduct(productId: number) {
    //swal
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(() => {
          this.products = this.products.filter(
            (product) => product.productId !== productId
          );
        });
      }
    });
  }
}
