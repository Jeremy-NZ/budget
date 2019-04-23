import { Action } from '@ngrx/store';
import { Transaction } from '../transaction';
import { TransactionMetaData } from '../TransactionMetaData';

export enum TransactionActionTypes {
    GetRecentTransactions = '[Transaction] Get Recent Transactions',
    GetTransactionsSuccess = '[Transaction] Get Transactions Success',
    GetTransactionsFailure = '[Transaction] Get Transactions Failure',
    GetTransactionMetaData = '[Transaction] Get Transaction Meta Data',
    GetTransactionMetaDataSuccess = '[Transaction] Get Transaction Meta Data Success',
    GetTransactionMetaDataFailure = '[Transaction] Get Transaction Meta Data Failure',
    InitializeCurrentTransaction = '[Transaction] Initialize Current Transaction',
    CreateTransaction = '[Transaction] Create Transaction',
    CreateTransactionFailure = '[Transaction] Create Transaction Failure',
    CreateTransactionSuccess = '[Transaction] Create Transaction Success',
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

export class GetTransactionMetaData implements Action {
    readonly type = TransactionActionTypes.GetTransactionMetaData;
}

export class GetTransactionMetaDataSuccess implements Action {
    readonly type = TransactionActionTypes.GetTransactionMetaDataSuccess;

    constructor(public transactionMetaData: TransactionMetaData) { }
}

export class GetTransactionMetaDataFailure implements Action {
    readonly type = TransactionActionTypes.GetTransactionMetaDataFailure;

    constructor(public errorMessage: string) { }
}

export class InitializeCurrentTransaction implements Action {
    readonly type = TransactionActionTypes.InitializeCurrentTransaction;
}

export class CreateTransaction implements Action {
    readonly type = TransactionActionTypes.CreateTransaction;
    constructor(public transaction: Transaction) { }
}

export class CreateTransactionFailure implements Action {
    readonly type = TransactionActionTypes.CreateTransactionFailure;
    constructor(public errorMessage: string) { }
}

export class CreateTransactionSuccess implements Action {
    readonly type = TransactionActionTypes.CreateTransactionSuccess;
    constructor(public transaction: Transaction) { }
}

/* *
 * Union the action classes into a single union type which represents all the action creators.
 * This allows us to strongly type the reducer
 * */
export type TransactionActions = InitializeCurrentTransaction
    | CreateTransaction
    | CreateTransactionFailure
    | CreateTransactionSuccess
    | GetTransactionMetaData
    | GetTransactionMetaDataFailure
    | GetTransactionMetaDataSuccess
    | GetRecentTransactions
    | GetTransactionsSuccess
    | GetTransactionsFailure;

