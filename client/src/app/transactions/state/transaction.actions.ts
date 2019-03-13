import { Action } from '@ngrx/store';
import { Transaction } from '../transaction';

export enum TransactionActionTypes {
    GetRecentTransactions = '[Transaction] Get Recent Transactions',
    GetTransactionsSuccess = '[Transaction] Get Transactions Success',
    GetTransactionsFailure = '[Transaction] Get Transactions Failure'
}

export class GetRecentTransactions implements Action {
    readonly type = TransactionActionTypes.GetRecentTransactions;
}

export class GetTransactionsSuccess implements Action {
    readonly type = TransactionActionTypes.GetTransactionsSuccess;

    constructor(public transactions: Transaction[]) { }
}

export class GetTransactionsFailure implements Action {
    readonly type = TransactionActionTypes.GetTransactionsFailure;

    constructor(public errorMessage: string) { }
}

/* *
 * Union the action classes into a single union type which represents all the action creators.
 * This allows us to strongly type the reducer
 * */
export type TransactionActions = GetRecentTransactions
                            | GetTransactionsSuccess
                            | GetTransactionsFailure;
