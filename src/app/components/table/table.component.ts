import { Component, Input } from '@angular/core';
import { GetPagesPipe } from '@pipes/get-pages.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    GetPagesPipe,
  ],
})
export class TableComponent {
  _rows: string[][] = [];
  currentPageRows: string[][] = [];
  currentPage = 1;
  totalPages = 1;

  @Input() pageSize = 10;
  @Input() header!: string[];

  @Input() set rows(value: string[][]) {
    this._rows = value;
    this.currentPage = 1;
    this.totalPages = Math.ceil(value.length / this.pageSize);
    this.setCurrentPageRows();
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.setCurrentPageRows();
  }

  private setCurrentPageRows(): void {
    const firstItemIndex = (this.currentPage-1)*this.pageSize;
    const lastItemIndex = firstItemIndex + this.pageSize;
    this.currentPageRows = this._rows.slice(
      firstItemIndex,
      lastItemIndex < this._rows.length ? lastItemIndex : this._rows.length
    );
  }

}
