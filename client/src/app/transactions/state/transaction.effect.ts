import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as transactionActions from './transaction.actions';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';
import { TransactionMetaData } from '../TransactionMetaData';

@Injectable()
export class TransactionEffects {
    constructor(private actions$: Actions,
                private transactionService: TransactionService) { }

    @Effect()
    CreateTransaction$ = this.actions$.pipe(
        ofType(transactionActions.TransactionActionTypes.CreateTransaction),
        mergeMap((action: transactionActions.CreateTransaction) => this.transactionService.createTransaction(action.transaction)
            .pipe(
                map((transaction: Transaction) => {
                    return new transactionActions.CreateTransactionSuccess(transaction);
                }),
                catchError(err => of(new transactionActions.CreateTransactionFailure(err)))
            )
        )
    );

    @Effect()
    LoadRecentTransactions$ = this.actions$.pipe(
        ofType(transactionActions.TransactionActionTypes.GetRecentTransactions),
        mergeMap(() => this.transactionService.getRecentTransactions()
            .pipe(
                map((transactions: Transaction[]) => {
                    return new transactionActions.GetTransactionsSuccess(transactions);
                }),
                catchError(err => of(new transactionActions.GetTransactionsFailure(err)))))
    );

    @Effect()
    LoadTransactionMetaData$ = this.actions$.pipe(
        ofType(transactionActions.TransactionActionTypes.GetTransactionMetaData),
        mergeMap(() => this.transactionService.getTransactionMetaData().pipe(
                    map((metaData: TransactionMetaData) => new transactionActions.GetTransactionMetaDataSuccess(metaData)),
                        catchError(err => of(new transactionActions.GetTransactionMetaDataFailure(err))))
        )
    );
}
