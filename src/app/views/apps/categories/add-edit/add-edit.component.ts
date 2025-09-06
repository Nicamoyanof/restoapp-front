import { Component, OnInit } from '@angular/core';
import { ProductPhotoComponent } from './components/product-photo/product-photo.component';
import { ProductGeneralInfoComponent } from './components/product-general-info/product-general-info.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryProductService } from '@/app/services/category-product.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Toast,
  ToastService,
} from '@/app/UIcomponents/baseUi/toasts/toast.service';
import Toastify from 'toastify-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit',
  imports: [
    ProductPhotoComponent,
    ProductGeneralInfoComponent,
    FormsModule,
    ReactiveFormsModule,
    DropzoneModule,
    NgbToastModule,
    RouterLink,
  ],
  templateUrl: './add-edit.component.html',
  styles: ``,
})
export class CategoryAddEditComponent implements OnInit {
  formGroup: FormGroup;
  isEdit: boolean = false;
  showToast: boolean = false;

  constructor(
    private categoryProductService: CategoryProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEdit = true;
      this.categoryProductService.getCategoryProductById(categoryId).subscribe({
        next: (category: any) => {
          this.formGroup.patchValue({
            name: category.name,
          });
        },
        error: (err) => {
          this.router.navigate(['/pages/404']);
        },
      });
    } else {
      this.isEdit = false;
    }
  }

  save() {
    if (this.formGroup.valid) {
      const body: any = {
        name: this.formGroup.value.name,
        isActive: true,
      };

      if (this.isEdit) {
        body.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
        this.categoryProductService
          .updateCategoryProduct(
            this.activatedRoute.snapshot.paramMap.get('id'),
            body
          )
          .subscribe((response) => {
            const toast: Toast = {
              content: 'Categoría actualizada con éxito',
              gravity: 'top',
              position: 'right',
              className: 'bg-success',
            };
            Toastify({
              text: 'Categoría actualizada con éxito',
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top', // `top` or `bottom`
              position: 'right', // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: '#1BB394',
              },
              onClick: function () {}, // Callback after click
            }).showToast();
            this.formGroup.reset();
            this.router.navigate(['/categories/listing']);
          });
      } else {
        this.categoryProductService
          .createCategoryProduct(body)
          .subscribe((response) => {
            const toast: Toast = {
              content: 'Categoría creada con éxito',
              gravity: 'top',
              position: 'right',
              className: 'bg-success',
            };
            Toastify({
              text: 'Categoría creada con éxito',
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top', // `top` or `bottom`
              position: 'right', // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: '#1BB394',
              },
              onClick: function () {}, // Callback after click
            }).showToast();
            this.formGroup.reset();
          });
      }
    }
  }
}
