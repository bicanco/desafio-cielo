import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountEntriesPageComponent } from './account-entries-page/account-entries-page.component';
import { AccountMainPageComponent } from './account-main-page/account-main-page.component';

const routes: Routes = [
  {
    path: '',
    data: {
      pageTitle: 'Conta',
      icon: 'bi bi-cash-coin text-success',
    },
    children: [
      {
        path: '',
        component: AccountMainPageComponent,
      },
      {
        path: 'lancamentos',
        component: AccountEntriesPageComponent,
        data: {
          pageTitle: 'Lançamentos da Conta',
          icon: 'bi bi-search text-success',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
