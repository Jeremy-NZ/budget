import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as accountActions from './account.actions';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ITransaction } from '../transaction';


@Injectable()
export class AccountEffects {
    constructor(private actions$: Actions,
                private accountService: AccountService) { }

    @Effect()
    LoadAccounts$ = this.actions$.pipe(
        ofType(accountActions.AccountActionTypes.GetAccounts),
        mergeMap(() => this.accountService.getAccounts().pipe(
                    map((accounts: Account[]) => new accountActions.GetAccountsSuccess(accounts)),
                        catchError(err => of(new accountActions.GetAccountsFailure(err))))
        )
    );

    @Effect()
    CreateTransaction$ = this.actions$.pipe(
        ofType(accountActions.AccountActionTypes.CreateTransaction),
        mergeMap((action: accountActions.CreateTransaction) => this.accountService.createTransaction(action.transaction)
            .pipe(
                map((transaction: ITransaction) => {
                    return new accountActions.CreateTransactionSuccess(transaction);
                }),
                catchError(err => of(new accountActions.CreateTransactionFailure(err)))
            )
        )
    );

    @Effect()
    LoadRecentTransactions$ = this.actions$.pipe(
        ofType(accountActions.AccountActionTypes.GetRecentTransactions),
        mergeMap(() => this.accountService.getRecentTransactions()
            .pipe(
                map((transactions: ITransaction[]) => {
                    return new accountActions.GetTransactionsSuccess(transactions);
                }),
                catchError(err => of(new accountActions.GetTransactionsFailure(err)))))
    );
}
