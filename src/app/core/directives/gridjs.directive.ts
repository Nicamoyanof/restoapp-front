import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Grid, html } from 'gridjs';

@Directive({
  selector: '[appGridjs]'
})
export class GridJsDirective implements OnChanges {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() search: boolean = true;
  @Input() pagination: any = { limit: 5 };
  @Input() sort: boolean = true;
  @Input() resizable: boolean = false;
  @Input() actionType: 'button' | 'link' | 'none' = 'none';
  @Input() fixedHeader: boolean = true
  private gridInstance: any;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridInstance) {
      this.gridInstance.destroy();
    }
    this.renderGrid();
  }

  private renderGrid(): void {
    const actionColumn = this.getActionColumn();

    const gridColumns = this.columns.map(col => {
      if (typeof col === 'string') {
        return col; // Simple column name
      }
      return {
        name: col.name,
        hidden: col.hidden ?? false // Apply hidden property
      };
    });

    this.gridInstance = new Grid({
      columns: actionColumn ? [...gridColumns, actionColumn] : gridColumns,
      data: this.data,
      search: this.search,
      pagination: this.pagination,
      sort: this.sort,
      resizable: this.resizable
    }).render(this.el.nativeElement);
  }

  private getActionColumn() {
    if (this.actionType === 'button') {
      return {
        name: 'Actions',
        formatter: () => html(`<span><button type="button" class="btn btn-sm btn-light">Details</button></span>`)
      };
    } else if (this.actionType === 'link') {
      return {
        name: 'Actions',
        formatter: () => html("<a href='#' class='text-decoration-underline'> Details</a>")
      };
    }
    return null;
  }
}
