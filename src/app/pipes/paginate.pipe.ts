import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(totalPages: number): number[] {
    const pages = [];

    for(let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

}
