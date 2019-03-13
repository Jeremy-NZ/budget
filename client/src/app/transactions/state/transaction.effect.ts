import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as transactionActions from './transaction.actions';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';

@Injectable()
export class TransactionEffects {
    constructor(private actions$: Actions,
                private transactionService: TransactionService) { }

    @Effect()
    LoadProducts$ = this.actions$.pipe(
        ofType(transactionActions.TransactionActionTypes.GetRecentTransactions),
        mergeMap((action: transactionActions.GetRecentTransactions) => this.transactionService.getRecentTransactions()
            .pipe(
                map((transactions: Transaction[]) => {
                    console.log('in effect');
                    return new transactionActions.GetTransactionsSuccess(transactions); }),
                catchError(err => of(new transactionActions.GetTransactionsFailure(err)))))
    );

}
