import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import { NouisliderModule } from 'ng2-nouislider';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProductService } from '@/app/services/product.service';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-product-general-info',
  imports: [
    NouisliderModule,
    FormsModule,
    NgbRatingModule,
    SelectFormInputDirective,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './product-general-info.component.html',
  styles: ``,
})
export class ProductGeneralInfoComponent implements OnInit {
  formGroup: FormGroup;
  @Input() categories: any[] = [];
  isEdit: boolean = false;
  productId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      categoryId: new FormControl(0, [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
      ]),
      stock: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngOnInit(): void {
    //validar si es edicion o creacion
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEdit = true;
      this.productId = this.activatedRoute.snapshot.paramMap.get('id');
      this.productService
        .getProductById(this.productId)
        .subscribe((product: any) => {
          this.formGroup.patchValue({
            productName: product.name,
            category: product.categoryId,
            description: product.description,
            price: product.price,
            stock: product.stock,
          });
        });
    }
  }

  save() {
    if (this.formGroup.valid) {
      const body: any = this.formGroup.value;

      body.price = parseFloat(body.price);
      body.stock = parseInt(body.stock);
      body.categoryId = parseInt(body.categoryId);

      if (this.isEdit) {
        body.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
        this.productService
          .updateProduct(this.activatedRoute.snapshot.paramMap.get('id'), body)
          .subscribe((response) => {
            Toastify({
              text: 'Producto actualizado con éxito',
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
            this.router.navigate(['/product/listing']);
          });
      } else {
        this.productService.createProduct(body).subscribe((response) => {
          Toastify({
            text: 'Producto creado con éxito',
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
