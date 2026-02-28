import { Component, OnInit } from '@angular/core';
import { ProductGeneralInfoComponent } from './components/product-general-info/product-general-info.component';
import { CategoryProductService } from '@/app/services/category-product.service';

@Component({
  selector: 'app-add-edit',
  imports: [ProductGeneralInfoComponent],
  templateUrl: './add-edit.component.html',
  styles: ``,
})
export class AddEditComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryProductService: CategoryProductService) {}

  ngOnInit(): void {}
}
