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
import { BaseUnitEnum } from '@common/base-units';
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
  ingredientId: any;
  resetEmitter = new EventEmitter<string>();
  categoryId: any;
  kitchens: any[] = [];
  baseUnits = BaseUnitEnum;

  @ViewChild('trackStockYes') trackStockYes!: ElementRef;
  @ViewChild('trackStockNo') trackStockNo!: ElementRef;
  @ViewChild('allowSellWithoutStockYes') allowSellWithoutStockYes!: ElementRef;
  @ViewChild('allowSellWithoutStockNo') allowSellWithoutStockNo!: ElementRef;

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
    })
      .pipe(take(1))
      .subscribe(({ categories }: any) => {
        this.categories = categories;
        if (id) {
          this.ingredientId = id;
          this.isEdit = true;
          this.ingredientService
            .getIngredientById(id)
            .subscribe((ingredient: any) => {
              this.formGroup.patchValue({
                name: ingredient.name,
                category: ingredient.category,
                baseUnitId: ingredient.baseUnitId,
                trackStock: ingredient.trackStock,
                allowSellWithoutStock: ingredient.allowSellWithoutStock,
                cost: ingredient.avgCost,
              });

              if (ingredient.trackStock) {
                this.trackStockYes.nativeElement.checked = true;
              } else {
                this.trackStockNo.nativeElement.checked = true;
              }

              if (ingredient.allowSellWithoutStock) {
                this.allowSellWithoutStockYes.nativeElement.checked = true;
              } else {
                this.allowSellWithoutStockNo.nativeElement.checked = true;
              }

              this.resetEmitter.emit();
            });
        }
      });
  }

  save() {
    if (!this.formGroup.invalid) {
      // Si el formulario es válido, procedemos a guardar con swal
      const ingredientData = this.formGroup.value;

      if (this.isEdit) {
        this.ingredientService
          .updateIngredient(this.ingredientId, ingredientData)
          .subscribe({
            next: (res) => {
              Toastify({
                text: 'Ingrediente actualizado con éxito',
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
                text: 'Error al actualizar ingrediente',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                backgroundColor: '#ff4d4d',
              }).showToast();
            },
          });
      } else {
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
  onTrackStockChange(event: any, option: string) {
    const isChecked = event.target.checked && option === 'yes';
    this.formGroup.patchValue({ trackStock: isChecked });
  }

  onAllowSellWithoutStockChange(event: any, option: string) {
    const isChecked = event.target.checked && option === 'yes';
    this.formGroup.patchValue({ allowSellWithoutStock: isChecked });
  }
}
