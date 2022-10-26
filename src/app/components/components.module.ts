import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@pipes/pipes.module';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { SunburstComponent } from './sunburst/sunburst.component';
import { TableComponent } from './table/table.component';

const components = [
  BreadcrumbComponent,
  HeaderComponent,
  LoadingComponent,
  SunburstComponent,
  TableComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ...components,
  ],
})
export class ComponentsModule { }
