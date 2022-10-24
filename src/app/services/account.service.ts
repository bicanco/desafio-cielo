import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from '@utils';

import { AccountEntry } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getEntries(): Observable<PaginatedResponse<AccountEntry>> {
    return this.httpClient.get<PaginatedResponse<AccountEntry>>(
      Endpoints.AccountEntries
    );
  }
}
