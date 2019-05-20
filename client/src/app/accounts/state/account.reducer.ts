import { AccountState, initialState } from './account.state';
import { AccountActions, AccountActionTypes } from './account.actions';

/**
 * NgRx reducer for updating accounts in the store
 * @param state The state object to clone and modify. Defaults to the initial state defined in account.state.ts
 * @param action Account action used to update the account state in the store.
 */
export function reducer(state = initialState, action: AccountActions): AccountState {
    switch (action.type) {
        case AccountActionTypes.GetAccountsSuccess:
            return {
                ...state,
                accounts: action.accounts
            };
        case AccountActionTypes.GetAccountsFailure:
            return {
                ...state,
                error: action.errorMessage,
            };
        case AccountActionTypes.GetTransactionsSuccess:
            return {
                ...state,
                transactions: action.transactions
            };
        case AccountActionTypes.GetTransactionsFailure:
            return {
                ...state,
                error: action.errorMessage,
                transactions: []
            };
        case AccountActionTypes.CreateTransactionSuccess:
            return {
                ...state,
                transactions: [...state.transactions, action.transaction],
                currentTransactionId: 0,
                error: ''
            };

        case AccountActionTypes.CreateTransactionFailure:
            return {
                ...state,
                error: action.errorMessage
            };
        case AccountActionTypes.SetCurrentAccount:
            return {
                ...state,
                currentAccount: action.account
            };
        default:
            return state;
    }
}
