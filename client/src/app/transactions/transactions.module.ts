import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TransactionsComponent } from './transaction-container/transactions.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { reducer } from './state/transaction.reducer';
import { TransactionEffects } from './state/transaction.effect';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { SharedModule } from '../shared/shared.module';

const transactionRoutes: Routes = [
  { path: '', component: TransactionsComponent }
];

@NgModule({
  declarations: [TransactionsComponent, TransactionListComponent, TransactionEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(transactionRoutes),
    StoreModule.forFeature('transactions', reducer),
    EffectsModule.forFeature([TransactionEffects])
  ]
})
export class TransactionsModule { }
