import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPages'
})
export class GetPagesPipe implements PipeTransform {

  transform(totalPages: number): number[] {
    const pages = [];

    for(let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

}
