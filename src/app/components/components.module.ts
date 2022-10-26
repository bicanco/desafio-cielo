import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { SunburstComponent } from './sunburst/sunburst.component';

const components = [
  BreadcrumbComponent,
  HeaderComponent,
  SunburstComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...components,
  ],
})
export class ComponentsModule { }
