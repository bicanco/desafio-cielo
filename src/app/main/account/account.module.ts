import {
    AccountMainPageComponent,
} from 'src/app/main/account/account-main-page/account-main-page.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';

import { AccountDetailsPageComponent } from './account-details-page/account-details-page.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    AccountMainPageComponent,
    AccountDetailsPageComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    ComponentsModule,
  ]
})
export class AccountModule { }
