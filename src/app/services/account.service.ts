import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { AccountEntry } from '@models';
import { Endpoints } from '@utils';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getEntries(): Observable<PaginatedResponse<AccountEntry>> {
    return this.httpClient.get<PaginatedResponse<AccountEntry>>(
      `${environment.APIurl}${Endpoints.AccountEntries}`
    );
  }
}
