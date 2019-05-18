import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Transaction } from '../transaction';
import * as fromTransactions from '../state/transaction.state';
import * as TransactionActions from '../state/transaction.actions';
import { AccountMetaData } from '../AccountsMetaData';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  currentTransaction$: Observable<Transaction>;
  accountsMetaData$: Observable<AccountMetaData[]>;

  constructor(private store: Store<fromTransactions.State>) { }

  ngOnInit() {
    // kick of call to get the most recent transactions
    this.store.dispatch(new TransactionActions.GetRecentTransactions());
    this.store.dispatch(new TransactionActions.GetTransactionMetaData());

    this.accountsMetaData$ = this.store.pipe(select(fromTransactions.getAccountsMetaData));
    this.transactions$ = this.store.pipe(select(fromTransactions.getTransactions));
    this.currentTransaction$ = this.store.pipe(select(fromTransactions.getCurrentTransaction));
  }

  createTransaction(transaction: Transaction) {
    this.store.dispatch(new TransactionActions.CreateTransaction(transaction));
  }
}
