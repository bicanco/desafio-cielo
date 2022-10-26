import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginatePipe } from './paginate.pipe';

const pipes = [
  PaginatePipe,
];

@NgModule({
  declarations: [
    ...pipes,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...pipes,
  ],
})
export class PipesModule { }
