import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountEntry } from '@models';
import { Endpoints } from '@utils';

import { environment } from '../../environments/environment';

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
