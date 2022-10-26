import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountDetailsPageComponent } from './account-details-page/account-details-page.component';
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
        path: 'detalhes',
        component: AccountDetailsPageComponent,
        data: {
          pageTitle: 'Detalhes da Conta',
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
