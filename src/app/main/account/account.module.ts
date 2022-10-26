import {
    AccountMainPageComponent,
} from 'src/app/main/account/account-main-page/account-main-page.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';

import { AccountEntriesPageComponent } from './account-entries-page/account-entries-page.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    AccountMainPageComponent,
    AccountEntriesPageComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
