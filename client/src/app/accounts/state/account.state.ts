
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { Account } from '../account';
import { ITransaction } from '../transaction';

/**
 * Extend the base state object as the account module is lazy loaded.
 */
export interface State extends fromRoot.State {
    accounts: AccountState;
}

export interface AccountState {
    accounts: Account[];
    currentAccount: Account;
    currentTransactionId: number;
    error: string;
    transactions: ITransaction[];
}

export const initialState: AccountState = {
    currentTransactionId: null,
    accounts: [],
    currentAccount: null,
    transactions: [],
    error: ''
};

const getAccountFeatureState = createFeatureSelector<AccountState>('accounts');

export const getAccounts = createSelector(getAccountFeatureState, state => state.accounts);

export const getTransactions = createSelector(getAccountFeatureState, state => state.transactions);

export const getCurrentAccount = createSelector(getAccountFeatureState, state => state.currentAccount);

export const getCurrentTransactionId = createSelector(getAccountFeatureState, state => state.currentTransactionId);

export const getCurrentTransaction = createSelector(getAccountFeatureState, getCurrentTransactionId, (state, currentId) => {
    const currentTxn = state.transactions.find(txn => txn.id === currentId);
    return currentTxn ? currentTxn : null;
});
