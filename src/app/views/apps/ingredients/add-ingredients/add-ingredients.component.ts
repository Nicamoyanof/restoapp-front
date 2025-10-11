import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
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
import { CategoryProductService } from '@/app/services/category-product.service';
import { NgxMaskDirective } from 'ngx-mask';
import { KitchenService } from '@/app/services/kitchen.service';
import { forkJoin, of, take } from 'rxjs';
import { BaseUnitEnum } from '@/app/helper/base-units';
import { IngredientsService } from '@/app/services/ingredients.service';
@Component({
  selector: 'app-add-ingredients',
  imports: [
    NouisliderModule,
    FormsModule,
    NgbRatingModule,
    SelectFormInputDirective,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgxMaskDirective,
  ],
  templateUrl: './add-ingredients.component.html',
  styleUrl: './add-ingredients.component.scss',
})
export class AddIngredientsComponent {
  formGroup: FormGroup;
  categories: any[] = [];
  isEdit: boolean = false;
  productId: any;
  resetEmitter = new EventEmitter<string>();
  categoryId: any;
  kitchens: any[] = [];
  baseUnits = BaseUnitEnum;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientsService
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      category: new FormControl('', [Validators.required]),
      baseUnitId: new FormControl(0, [Validators.required]),
      trackStock: new FormControl(true, [Validators.required]),
      allowSellWithoutStock: new FormControl(false, [Validators.required]),
      cost: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
      ]),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    forkJoin({
      categories: this.ingredientService.getCategories(),
      // kitchens: this.kitchenService.getKitchens(),
      // product: id ? this.productService.getProductById(id) : of(null),
    })
      .pipe(take(1))
      .subscribe(({ categories, kitchens, product }: any) => {
        this.categories = categories;
        this.kitchens = kitchens;

        if (product) {
          this.isEdit = true;
          this.productId = id!;
          this.categoryId = product.categoryId;

          this.formGroup.patchValue({
            name: product.name,
            categoryId: product.categoryId,
            description: product.description,
            price: product.price,
            stock: product.stock,
            kitchenId: product.kitchenId ?? 0,
            // si el producto aún no tiene cocina, no seteamos nada aquí
          });
        }
      });
  }

  save() {
    if (!this.formGroup.invalid) {
      // Si el formulario es válido, procedemos a guardar con swal
      const ingredientData = this.formGroup.value;

      this.ingredientService.createIngredient(ingredientData).subscribe({
        next: (res) => {
          Toastify({
            text: 'Ingrediente creado con éxito',
            duration: 3000,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: '#4fbe87',
          }).showToast();
          this.router.navigate(['/apps/ingredients/list-ingredients']);
        },
        error: (err) => {
          Toastify({
            text: 'Error al crear ingrediente',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: '#ff4d4d',
          }).showToast();
        },
      });
    }
  }
}
