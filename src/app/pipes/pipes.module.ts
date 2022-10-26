import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetPagesPipe } from './get-pages.pipe';

const pipes = [
  GetPagesPipe,
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
