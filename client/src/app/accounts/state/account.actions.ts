import { Action } from '@ngrx/store';
import { Account } from '../account';
import { ITransaction } from '../transaction';

export enum AccountActionTypes {
    GetAccounts = '[Account] Get Accounts',
    GetAccountsSuccess = '[Account] Get Accounts Success',
    GetAccountsFailure = '[Account] Get Accounts Failure',
    GetRecentTransactions = '[Account] Get Recent Transactions',
    GetTransactionsSuccess = '[Account] Get Transactions Success',
    GetTransactionsFailure = '[Account] Get Transactions Failure',
    InitializeCurrentTransaction = '[Account] Initialize Current Transaction',
    CreateTransaction = '[Account] Create Transaction',
    CreateTransactionFailure = '[Account] Create Transaction Failure',
    CreateTransactionSuccess = '[Account] Create Transaction Success',
    SetCurrentAccount = '[Account] Set Current Account'
}

export class GetAccounts implements Action {
    readonly type = AccountActionTypes.GetAccounts;
}

export class GetAccountsSuccess implements Action {
    readonly type = AccountActionTypes.GetAccountsSuccess;

    constructor(public accounts: Account[]) { }
}

export class GetAccountsFailure implements Action {
    readonly type = AccountActionTypes.GetAccountsFailure;

    constructor(public errorMessage: string) { }
}

export class GetRecentTransactions implements Action {
    readonly type = AccountActionTypes.GetRecentTransactions;
}

export class GetTransactionsSuccess implements Action {
    readonly type = AccountActionTypes.GetTransactionsSuccess;

    constructor(public transactions: ITransaction[]) { }
}

export class GetTransactionsFailure implements Action {
    readonly type = AccountActionTypes.GetTransactionsFailure;

    constructor(public errorMessage: string) { }
}

export class InitializeCurrentTransaction implements Action {
    readonly type = AccountActionTypes.InitializeCurrentTransaction;
}

export class CreateTransaction implements Action {
    readonly type = AccountActionTypes.CreateTransaction;
    constructor(public transaction: ITransaction) { }
}

export class CreateTransactionFailure implements Action {
    readonly type = AccountActionTypes.CreateTransactionFailure;
    constructor(public errorMessage: string) { }
}

export class CreateTransactionSuccess implements Action {
    readonly type = AccountActionTypes.CreateTransactionSuccess;
    constructor(public transaction: ITransaction) { }
}


export class SetCurrentAccount implements Action {
    readonly type = AccountActionTypes.SetCurrentAccount;
    constructor(public account: Account) { }
}

/* *
 * Union the action classes into a single union type which represents all the action creators.
 * This allows us to strongly type the reducer
 * */
export type AccountActions = GetAccounts
    | GetAccountsSuccess
    | GetAccountsFailure
    | InitializeCurrentTransaction
    | CreateTransaction
    | CreateTransactionFailure
    | CreateTransactionSuccess
    | GetRecentTransactions
    | GetTransactionsSuccess
    | GetTransactionsFailure
    | SetCurrentAccount;

