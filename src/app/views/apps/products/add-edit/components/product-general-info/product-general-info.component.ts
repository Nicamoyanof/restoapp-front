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
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectFormInputDirective } from '@core/directives/select-form-input.directive';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ProductService } from '@/app/services/product.service';
import Toastify from 'toastify-js';
import { CategoryProductService } from '@/app/services/category-product.service';
import { NgxMaskDirective } from 'ngx-mask';
import { KitchenService } from '@/app/services/kitchen.service';
import { forkJoin, of, take } from 'rxjs';
import { IngredientsService } from '@/app/services/ingredients.service';
import { RecipesService } from '@/app/services/recipes.service';
import { BaseUnitEnum } from '@common/base-units';
import Swal from 'sweetalert2';

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
    NgxMaskDirective,
    CommonModule,
  ],
  templateUrl: './product-general-info.component.html',
  styles: ``,
})
export class ProductGeneralInfoComponent implements OnInit {
  formGroup: any;
  categories: any[] = [];
  isEdit: boolean = false;
  productId: any;
  resetEmitter = new EventEmitter<string>();
  categoryId: any;
  kitchens: any[] = [];
  formGroupRecipe: FormGroup;
  ingredients: any[] = [];
  baseUnit = BaseUnitEnum;
  yes: string = 'Sí';
  no: string = 'No';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private categoryProductService: CategoryProductService,
    private kitchenService: KitchenService,
    private ingredientService: IngredientsService,
    private fb: FormBuilder,
    private recipesService: RecipesService
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      categoryId: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
      ]),
      stock: new FormControl(0, [
        // Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      kitchenId: new FormControl(null, [Validators.required]),
      trackStock: new FormControl(false),
    });
    this.formGroupRecipe = this.fb.group({
      recipeItems: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    forkJoin({
      categories: this.categoryProductService.getCategoryProducts(),
      kitchens: this.kitchenService.getKitchens(),
      product: id ? this.productService.getProductById(id) : of(null),
      ingredients: this.ingredientService.getIngredients(),
      recipes: id ? this.recipesService.getRecipeByProductId(id) : of([]),
    })
      .pipe(take(1))
      .subscribe(
        ({ categories, kitchens, product, ingredients, recipes }: any) => {
          this.categories = categories;
          this.kitchens = kitchens;
          this.ingredients = ingredients;

          this.goToKitchenConfig();
          this.gotToCategoryConfig();

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
              trackStock: product.trackStock,
              // si el producto aún no tiene cocina, no seteamos nada aquí
            });
          }
          if (recipes) {
            recipes.forEach((recipe: any) => {
              (this.formGroupRecipe.get('recipeItems') as FormArray)?.push(
                this.fb.group({
                  ingredientId: [recipe.ingredientId, Validators.required],
                  quantity: [recipe.qtyNet, [Validators.required]],
                })
              );
            });
          }
        }
      );
  }

  save() {
    if (this.formGroup.valid) {
      const body: any = this.formGroup.value;

      body.price = parseFloat(body.price);
      body.stock = parseInt(body.stock);
      body.categoryId = parseInt(body.categoryId);

      if (this.isEdit) {
        body.productId = Number(
          this.activatedRoute.snapshot.paramMap.get('id')
        );
        this.productService
          .updateProduct(this.activatedRoute.snapshot.paramMap.get('id'), body)
          .subscribe({
            next: (response) => {
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
              this.resetEmitter.emit('reset');
              this.router.navigate(['/product/listing']);
            },
            error: (error) => {
              Toastify({
                text: 'Error al actualizar el producto',
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top', // `top` or `bottom`
              }).showToast();
            },
          });
      } else {
        this.productService.createProduct(body).subscribe({
          next: (response: any) => {
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
            this.resetEmitter.emit('reset');
          },
          error: (error) => {
            Toastify({
              text: 'Error al crear el producto',
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top', // `top` or `bottom`
            }).showToast();
          },
        });
      }
      this.sendRecipe();
    }
  }
  get recipeItems(): FormArray {
    return this.formGroupRecipe.get('recipeItems') as FormArray;
  }

  addRecipeItem(): void {
    if (this.ingredients.length === 0) {
      Swal.fire({
        title: 'No hay ingredientes disponibles',
        text: 'Debe agregar al menos un ingrediente antes de agregar una receta.',
        icon: 'warning',
        confirmButtonText: 'Ir a configuración de ingredientes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/settings/ingredient']);
        }
      });
      return;
    }

    this.recipeItems.push(
      this.fb.group({
        ingredientId: [null, Validators.required],
        quantity: [null, [Validators.required]],
      })
    );
  }

  removeRecipeItem(index: number): void {
    this.recipeItems.removeAt(index);
  }

  // Opcional: total en tiempo real
  get totalCost(): number {
    // return this.recipeItems.controls.reduce(({ acc, ctrl }: any) => {
    //   const qty =
    //     Number(
    //       ctrl
    //         .get('quantity')
    //         ?.value?.toString()
    //         .replace('.', '')
    //         .replace(',', '.')
    //     ) || 0;
    //   const cost =
    //     Number(
    //       ctrl.get('cost')?.value?.toString().replace('.', '').replace(',', '.')
    //     ) || 0;
    //   return acc + qty * cost;
    // }, 0);
    return 0;
  }

  getCostValue(index: number) {
    const id = this.recipeItems.at(index).get('ingredientId')?.value;
    const value = [...this.ingredients].find((ing) => ing.id == id)?.avgCost;
    return value ? parseFloat(value) : 0;
  }

  sendRecipe() {
    console.log(this.formGroupRecipe.value, this.productId);
    if (this.formGroupRecipe.valid && this.productId) {
      const body = this.formGroupRecipe.value;
      body.lines = body.recipeItems.map((item: any) => ({
        ingredientId: parseInt(item.ingredientId),
        qtyNet: parseFloat(item.quantity.toString().replace(',', '.')),
      }));

      this.recipesService
        .createRecipe(body, parseInt(this.productId))
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  getBaseUnitSymbol(index: number) {
    const ingredientId = this.recipeItems.at(index).get('ingredientId')?.value;
    const ingredient = this.ingredients.find((ing) => ing.id == ingredientId);
    if (ingredient) {
      const baseUnit = this.baseUnit.find(
        (bu) => bu.id == ingredient.baseUnitId
      );
      return baseUnit ? baseUnit.abbreviation : '';
    }
    return '';
  }
  onTrackStockChange(event: any) {
    const isChecked = event.target.checked;
    this.formGroup.patchValue({ trackStock: isChecked });
  }

  goToKitchenConfig() {
    if (!this.kitchens || this.kitchens.length == 0) {
      Swal.fire({
        title: 'No hay cocinas configuradas',
        text: 'Debe configurar al menos una cocina antes de asignar productos a una cocina.',
        icon: 'warning',
        confirmButtonText: 'Ir a configuración de cocinas',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/settings/kitchen']);
        }
      });
    }
  }

  gotToCategoryConfig() {
    if (!this.categories || this.categories.length == 0) {
      Swal.fire({
        title: 'No hay categorías de productos configuradas',
        text: 'Debe configurar al menos una categoría de productos antes de asignar productos a una categoría.',
        icon: 'warning',
        confirmButtonText: 'Ir a configuración de categorías',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/settings/category-product']);
        }
      });
    }
  }
}
