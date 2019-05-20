import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { ITransaction } from './transaction';
import { Account, CreditAccount, DebitAccount } from './account';
import { AccountType } from './account-type';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getRecentTransactions(): Observable<ITransaction[]> {
    const helloTransaction: ITransaction = {
      accountId: 1,
      id: 0,
      amount: 11,
      date: new Date(),
      merchant: 'KFC',
      bankMerchantDescription: '',
      userId: 0,
      split: []
    };

    return of([helloTransaction]).pipe(delay(1000));;
  }

  getAccounts(): Observable<Account[]> {
    const jointCreditAccount: CreditAccount = {
        availableCredit: 9000,
        balance: 400,
        creditLimit: 10000,
        name: 'Joint Credit Card',
        owners: [
          {
            userId: 1,
            name: 'Jeremy'
          },
          {
            userId: 2,
            name: 'Julie'
          }
        ],
        id: 1,
        type: AccountType.credit
      };

    const checkingAccount: DebitAccount = {
        balance: 100,
        name: 'Checking',
        owners: [
          {
            userId: 1,
            name: 'Jeremy'
          }
        ],
        id: 2,
        type: AccountType.debit
      };

    const helloMetaData: Account[] = [ jointCreditAccount, checkingAccount ];

    // simulate call to server
    return of(helloMetaData).pipe(delay(2000));
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    // TODO http call. for now create an id of < 100...
    transaction.id = Math.floor(Math.random() * Math.floor(100));
    return of(transaction).pipe(delay(1000));;
  }

  private handleError(err) {
    // TODO: utilise logging service here. . .
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
