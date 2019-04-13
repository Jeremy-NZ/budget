import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Transaction } from './transaction';
import * as fromTransactions from './state/transaction.state';
import * as TransactionActions from './state/transaction.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  addingTransation: boolean = false;
  
  constructor(private store: Store<fromTransactions.State>) { }

  ngOnInit() {
    // kick of call to get the most recent transactions
    this.store.dispatch(new TransactionActions.GetRecentTransactions());

    this.transactions$ = this.store.pipe(select(fromTransactions.getTransactions));
  }

  openAddTransaction() {
    this.addingTransation = true;
  }

}
