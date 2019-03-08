import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions.component';

const transactionRoutes: Routes = [
  { path: '', component: TransactionsComponent }
];

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(transactionRoutes),
  ]
})
export class TransactionsModule { }
