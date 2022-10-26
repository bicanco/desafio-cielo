import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'conta',
    loadChildren:
      () => import('src/app/main/account/account.module').then(M => M.AccountModule),
  },
  {
    path: "**",
    redirectTo: 'conta',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'enabled',
    },
   )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
