import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '@models';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input() breadcrumb: BreadcrumbItem[] = [];
}
