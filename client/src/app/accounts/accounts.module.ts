import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TransactionsComponent } from './account-container/account-container.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { reducer as accountReducer } from './state/account.reducer';
import { AccountEffects } from './state/account.effect';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { SharedModule } from '../shared/shared.module';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountSelectorComponent } from './account-selector/account-selector.component';

const transactionRoutes: Routes = [
  { path: '', component: TransactionsComponent }
];

@NgModule({
  declarations: [TransactionsComponent, TransactionListComponent, TransactionEditComponent, AccountOverviewComponent, AccountSelectorComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(transactionRoutes),
    StoreModule.forFeature('accounts',  accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class AccountsModule { }
