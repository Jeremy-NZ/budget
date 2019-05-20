import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ITransaction } from '../transaction';
import { Account } from '../account';
import * as fromAccounts from '../state/account.state';
import * as AccountActions from '../state/account.actions';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;
  currentTransaction$: Observable<ITransaction>;
  accounts$: Observable<Account[]>;
  currentAccount$: Observable<Account>;

  constructor(private store: Store<fromAccounts.State>) { }

  ngOnInit() {
    // kick of call to get the most recent transactions
    this.store.dispatch(new AccountActions.GetRecentTransactions());
    this.store.dispatch(new AccountActions.GetAccounts());

    this.accounts$ = this.store.pipe(select(fromAccounts.getAccounts));
    this.currentAccount$ = this.store.pipe(select(fromAccounts.getCurrentAccount));
    this.transactions$ = this.store.pipe(select(fromAccounts.getTransactions));
    this.currentTransaction$ = this.store.pipe(select(fromAccounts.getCurrentTransaction));
  }

  createTransaction(transaction: ITransaction) {
    this.store.dispatch(new AccountActions.CreateTransaction(transaction));
  }

  selectAccount(account: Account) {
    this.store.dispatch(new AccountActions.SetCurrentAccount(account));
  }
}
