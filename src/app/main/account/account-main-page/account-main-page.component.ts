import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountEntry, PaginatedResponse } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from '@services';
import { doOnSubscribe } from '@utils';

@UntilDestroy()
@Component({
  selector: 'app-account-main-page',
  templateUrl: './account-main-page.component.html',
  styleUrls: ['./account-main-page.component.scss'],
  providers: [
    DatePipe,
  ],
})
export class AccountMainPageComponent implements OnInit {
  data!: Record<string, any>[];
  layout: Record<string, any> = {
    margin: {l: 0, r: 0, b: 0, t:80},
    width: 700,
    height: 700,
  };

  isLoading = false;
  hasError = false;
  requestResponse?: PaginatedResponse<AccountEntry>;
  requestObservable?: Observable<PaginatedResponse<AccountEntry>>;

  constructor(
    private accountService: AccountService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.requestObservable = this.accountService.getEntries().pipe(
      untilDestroyed(this),
      doOnSubscribe(() => {
        this.isLoading = true;
        this.hasError = false;
      }),
      tap(entries => {
        this.isLoading = false;
        this.mapResponse(entries.items);
        this.layout.title = `Resumo dos lançamentos de ${
          this.datePipe.transform(entries.summary.initialDate, 'dd/MM/yyyy')
        }`
      }),
      catchError(error => {
        this.hasError = true;
        return throwError(error);
      }),
      finalize(() => this.isLoading = false),
    );

    this.requestObservable.subscribe();
  }

  private mapResponse(items: AccountEntry[]): void {
    const cardBrands = this.getAllValuesOfKey(items, 'cardBrand');
    const channels = this.getAllValuesOfKey(items, 'channel');
    const paymentType = this.getAllValuesOfKey(items, 'paymentType');
    const labelsTotal = this.computeLabelsTotal(
      cardBrands.length + channels.length + paymentType.length
    );

    const ids: string[] = new Array(labelsTotal);
    const labels: string[] = new Array(labelsTotal);
    const parents: string[] = new Array(labelsTotal);
    const values: number[] = new Array(labelsTotal);

    for (let i = 0; i < cardBrands.length; i++) {
      let entriesInBrand = 0;
      ids[i] = cardBrands[i];
      labels[i] = cardBrands[i];
      parents[i] = '';

      for (let j = 0; j < channels.length; j++) {
        const channelIndex =
          cardBrands.length + i*channels.length + j;

        let entriesInChannel = 0;
        ids[channelIndex] = `${cardBrands[i]} - ${channels[j].replace(/\s/g,'')}`;
        labels[channelIndex] = channels[j];
        parents[channelIndex] = cardBrands[i];

        for (let k = 0; k < paymentType.length; k++) {
          const paymentTypeIndex =
            cardBrands.length +
            cardBrands.length * channels.length +
            i*cardBrands.length + j*paymentType.length + k;

          const totalItems = items.filter(item =>
              item.cardBrand === cardBrands[i]
              && item.channel === channels[j]
              && item.paymentType === paymentType[k]
            ).length;

          ids[paymentTypeIndex] = `${cardBrands[i]} - ${channels[j].replace(/\s/g,'')} - ${paymentType[k]}`;
          labels[paymentTypeIndex] = paymentType[k];
          parents[paymentTypeIndex] = `${cardBrands[i]} - ${channels[j].replace(/\s/g,'')}`;

          values[paymentTypeIndex] = totalItems;
          entriesInChannel += totalItems;

        }

        values[channelIndex] = entriesInChannel;
        entriesInBrand += entriesInChannel;
      }

      values[i] = entriesInBrand;
    }


    setTimeout(() => this.data = [{
      type: 'sunburst',
      ids,
      labels,
      parents,
      values,
      branchvalues: 'total',
    }]);
  }

  tryAgain(): void {
    this.requestObservable?.subscribe();
  }

  private getAllValuesOfKey(items: AccountEntry[], key: keyof AccountEntry): string[] {
    const values = new Set<string>();

    items.forEach(item => values.add(item[key].toString()));

    return Array.from(values.values());
  }

  private computeLabelsTotal(n: number): number {
    if(!n) {
      return n;
    }
    return n + this.computeLabelsTotal(n-1);
  }
}
