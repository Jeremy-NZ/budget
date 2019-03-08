import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'transactions',
  // canActivate: [AuthGuard],
  // path to module # = name of class
  loadChildren: './transactions/transactions.module#TransactionsModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
