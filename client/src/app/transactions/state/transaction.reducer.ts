import { TransactionState, initialState } from '../state/transaction.state';
import { TransactionActions, TransactionActionTypes } from '../state/transaction.actions';

/**
 * NgRx reducer for updating transactions in the store
 * @param state The state object to clone and modify. Defaults to the initial state defined in transaction.state.ts
 * @param action Transaction action used to update the transaction state in the store.
 */
export function reducer(state = initialState, action: TransactionActions): TransactionState {
    switch (action.type) {
        case TransactionActionTypes.GetTransactionsSuccess:
            return {
                ...state,
                transactions: action.transactions
            };
        case TransactionActionTypes.GetTransactionsFailure:
            return {
                ...state,
                error: action.errorMessage,
                transactions: []
            };

        case TransactionActionTypes.CreateTransactionSuccess:
            return {
                ...state,
                transactions: [...state.transactions, action.transaction],
                currentTransactionId: action.transaction.id,
                error: ''
            };

        case TransactionActionTypes.CreateTransactionFailure:
            return {
                ...state,
                error: action.errorMessage
            };
        default:
            return state;
    }
}
