import { NgClass, SlicePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryProductService } from '@/app/services/category-product.service';

@Component({
  selector: 'app-total-categories',
  imports: [NgbPaginationModule, NgClass, SlicePipe, RouterLink, RouterLink],
  templateUrl: './total-categories.component.html',
  styles: ``,
})
export class TotalCategoriesComponent implements AfterViewInit {
  @Input() totalCategories: any[] = [];
  @Input() totalItems = 10;
  @Output() reload: any = new EventEmitter<void>();
  pageSize = 10;
  currentPage = 1;
  maxSize = Math.ceil(this.totalItems / this.pageSize);

  ngAfterViewInit() {}

  constructor(private categoryProductService: CategoryProductService) {}

  delete(categoryId: string | null) {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta seguro que desea eliminar esta categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarla!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#cc2402ff',
      cancelButtonColor: '#b1b1b1ff',
      customClass: {
        cancelButton: 'btn btn-danger w-xs mt-2',
      },
      showCloseButton: true,
    }).then((result) => {
      if (result.value) {
        this.categoryProductService
          .deleteCategoryProduct(categoryId)
          .subscribe(() => {
            Swal.fire({
              title: 'Eliminado!',
              text: 'La categoría ha sido eliminada.',
              icon: 'success',
              showCloseButton: true,
            }).then(() => {
              this.reload.emit();
            });
          });
      }
    });
  }
}
