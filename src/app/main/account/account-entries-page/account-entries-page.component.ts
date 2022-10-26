import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, finalize, tap } from 'rxjs/operators';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountEntry, PaginatedResponse, SelectOption } from '@models';
import { FormControl, FormGroup } from '@ng-stack/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from '@services';
import { doOnSubscribe } from '@utils';

@UntilDestroy()
@Component({
  selector: 'app-account-entries-page',
  templateUrl: './account-entries-page.component.html',
  styleUrls: ['./account-entries-page.component.scss'],
  providers:[
    CurrencyPipe,
    DatePipe,
  ],
})
export class AccountEntriesPageComponent implements OnInit {
  header: string[] = [
    '#',
    'Vendedor',
    'Nó de pagamento',
    'Raiz do CNPJ',
    'Data',
    'Tipo de Pagamento',
    'Bandeira do Cartão',
    'Código de Autorização',
    'Últimos Dígitos do Cartão',
    'Valor Bruto',
    'Valor Líquido',
    'Terminal',
    'Taxa de Administração',
    'Código do Canal',
    'Canal',
    'Montante Retirado',
    'MDR Mínimo',
    'Imposto MDR',
    'Taxa MDR',
    'Status',
  ];
  rows: string[][] = [];
  filteredRows: string[][] = [];
  isLoading = false;
  hasError = false;
  requestObservable?: Observable<PaginatedResponse<AccountEntry>>;

  searchForm = new FormGroup({
    field: new FormControl<number>(),
    query: new FormControl<string>({value: null, disabled: true}),
  });

  selectOptions: SelectOption[] = [
    { text: '#', value: 0 },
    { text: 'Vendedor', value: 1 },
    { text: 'Nó de pagamento', value: 2 },
    { text: 'Raiz do CNPJ', value: 3 },
    { text: 'Data', value: 4 },
    { text: 'Tipo de Pagamento', value: 5 },
    { text: 'Bandeira do Cartão', value: 6 },
    { text: 'Código de Autorização', value: 7 },
    { text: 'Últimos Dígitos do Cartão', value: 8 },
    { text: 'Valor Bruto', value: 9 },
    { text: 'Valor Líquido', value: 10 },
    { text: 'Terminal', value: 11 },
    { text: 'Taxa de Administração', value: 12 },
    { text: 'Código do Canal', value: 13 },
    { text: 'Canal', value: 14 },
    { text: 'Montante Retirado', value: 15 },
    { text: 'MDR Mínimo', value: 16 },
    { text: 'Imposto MDR', value: 17 },
    { text: 'Taxa MDR', value: 18 },
    { text: 'Status', value: 19 },
  ];

  constructor(
    private accountService: AccountService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.requestObservable = this.accountService.getEntries().pipe(
      untilDestroyed(this),
      doOnSubscribe(() => {
        this.isLoading = true
        this.hasError = false;
      }),
      tap(entries => {
        this.mapEntries(entries.items);
        this.filteredRows = this.rows;
      }),
      catchError(error => {
        this.hasError = true;
        return throwError(error);
      }),
      finalize(() => this.isLoading = false),
    );

    this.requestObservable.subscribe();

    this.searchForm.get('field')?.valueChanges.pipe(
      untilDestroyed(this),
      tap(() => {
        this.searchForm.get('query')?.enable();
        this.searchForm.get('query')?.reset();
      }),
    ).subscribe();

    this.searchForm.get('query')?.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      tap(query => {
        if (query) {
          this.filterRows(query, this.searchForm.value.field);
        } else {
          this.filteredRows = this.rows;
        }
      }),
    ).subscribe();
  }

  tryAgain(): void {
    this.requestObservable?.subscribe();
  }

  resetQuery(): void {
    this.searchForm.reset();
    this.searchForm.get('query')?.disable();
    this.filteredRows = this.rows;
  }

  private mapEntries(entries: AccountEntry[]): void {
    this.rows = entries.map(entry => ([
      entry.id,
      entry.merchantId,
      entry.paymentNode.toString(),
      entry.cnpjRoot.toString(),
      this.datePipe.transform(entry.date, 'dd/MM/yyyy')!,
      entry.paymentType,
      entry.cardBrand,
      entry.authorizationCode,
      entry.truncatedCardNumber,
      this.currencyPipe.transform(entry.grossAmount, 'BRL')!,
      this.currencyPipe.transform(entry.netAmount, 'BRL')!,
      entry.terminal,
      this.currencyPipe.transform(entry.administrationFee, 'BRL')!,
      entry.channelCode.toString(),
      entry.channel,
      this.currencyPipe.transform(entry.withdrawAmount, 'BRL')!,
      this.currencyPipe.transform(entry.minimumMDRAmmount, 'BRL')!,
      this.currencyPipe.transform(entry.mdrTaxAmount, 'BRL')!,
      this.currencyPipe.transform(entry.mdrFeeAmount, 'BRL')!,
      entry.status,
    ]));
  }

  private filterRows(query: string, field: number): void {
    this.filteredRows = this.rows.filter(row =>
      row[field].includes(query),
    );
  }
}

