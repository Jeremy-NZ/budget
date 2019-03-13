
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Transaction } from '../transaction';
import * as fromRoot from '../../state/app.state';

/**
 * Extend the base state object as the transaction module is lazy loaded.
 */
export interface State extends fromRoot.State {
    transactions: TransactionState;
}

export interface TransactionState {
    currentTransactionId: number;
    transactions: Transaction[];
    error: string;
}

export const initialState: TransactionState = {
    currentTransactionId: null,
    transactions: [],
    error: ''
};

const getTransactionFeatureState = createFeatureSelector<TransactionState>('transactions');

export const getTransactions = createSelector(getTransactionFeatureState, state => state.transactions);

export const getCurrentTransactionId = createSelector(getTransactionFeatureState, state => state.currentTransactionId);

export const getCurrentTransaction = createSelector(getTransactionFeatureState, getCurrentTransactionId, (state, currentId) => {
    if (currentId === 0) {
        return {
            amount: 0,
            date: new Date(),
            id: 0,
            merchant: '',
            bankMerchantDescription: '',
            userId: 0,
            split: []
        };
    } else {
        const currentTxn = state.transactions.find(txn => txn.id === currentId);
        return currentTxn ? currentTxn : null;
    }
});
