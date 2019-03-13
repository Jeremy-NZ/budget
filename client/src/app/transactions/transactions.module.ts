import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



import { TransactionsComponent } from './transactions.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { reducer } from './state/transaction.reducer';
import { TransactionEffects } from './state/transaction.effect';


const transactionRoutes: Routes = [
  { path: '', component: TransactionsComponent }
];

@NgModule({
  declarations: [TransactionsComponent, TransactionListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(transactionRoutes),
    StoreModule.forFeature('transactions', reducer),
    EffectsModule.forFeature([TransactionEffects])
  ]
})
export class TransactionsModule { }
