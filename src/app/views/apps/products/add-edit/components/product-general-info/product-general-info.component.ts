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
import { BaseUnitEnum } from '@/app/helper/base-units';

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
  formGroup: FormGroup;
  categories: any[] = [];
  isEdit: boolean = false;
  productId: any;
  resetEmitter = new EventEmitter<string>();
  categoryId: any;
  kitchens: any[] = [];
  formGroupRecipe: FormGroup;
  ingredients: any[] = [];
  baseUnit = BaseUnitEnum;

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
      name: new FormControl('', [Validators.required]),
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
      recipes: this.recipesService.getRecipeByProductId(id),
    })
      .pipe(take(1))
      .subscribe(
        ({ categories, kitchens, product, ingredients, recipes }: any) => {
          this.categories = categories;
          this.kitchens = kitchens;
          this.ingredients = ingredients;

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
            this.resetEmitter.emit('reset');
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
          this.resetEmitter.emit('reset');
        });
      }
      this.sendRecipe();
    }
  }
  get recipeItems(): FormArray {
    return this.formGroupRecipe.get('recipeItems') as FormArray;
  }

  addRecipeItem(): void {
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
}
