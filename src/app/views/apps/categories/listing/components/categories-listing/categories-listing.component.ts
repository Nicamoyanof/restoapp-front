import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { categoryList } from '../../data';

@Component({
  selector: 'app-categories-listing',
  imports: [],
  templateUrl: './categories-listing.component.html',
  styles: ``
})
export class CategoriesListingComponent {
  categoryListData = categoryList;
  selectedItem: any = null;

  constructor(private modalService: NgbModal) {}

  openModal(content: any, options: NgbModalOptions, item: any) {
    this.selectedItem = item;
    this.modalService.open(content, options);
  }
}
