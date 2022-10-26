import { concat, merge } from 'rxjs';
import { bufferCount, filter, map, switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BreadcrumbItem } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = '';
  breacrumb: BreadcrumbItem[] = [];
  icon = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      untilDestroyed(this),
      tap(event => {
        if(event instanceof NavigationStart) {
          this.breacrumb = [];
        }
      }),
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        let currentRoute = this.activatedRoute;
        const dataObservables = [merge(currentRoute.data, currentRoute.url)];

        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
          dataObservables.push(merge(currentRoute.data, currentRoute.url));
        }
        return concat(dataObservables);
      }),
      switchMap(dataObservable => dataObservable),
      bufferCount(2),
      map(data => ({
        ...data[0],
        route: data[1],
      }) as {[key: string]: any}),
      filter(data => data.pageTitle),
      tap(data => {
        this.title = data.pageTitle;
        this.icon = data.icon;
        if (this.breacrumb.slice(-1)[0]?.breadcrumb !== this.title) {
          this.breacrumb.push({
            breadcrumb: data.pageTitle,
            route: data.route[0]?.path,
          })
        }
      }),
    ).subscribe();
  }

}
