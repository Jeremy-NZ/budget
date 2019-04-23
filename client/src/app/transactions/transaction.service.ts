import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

import { Transaction } from './transaction';
import { TransactionMetaData } from './TransactionMetaData';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getRecentTransactions(): Observable<Transaction[]> {
    const helloTransaction: Transaction = {
      id: 0,
      amount: 11,
      date: new Date(),
      merchant: 'KFC',
      bankMerchantDescription: '',
      userId: 0,
      split: []
    };

    return of([helloTransaction]);
  }

  getTransactionMetaData(): Observable<TransactionMetaData> {
    const helloMetaData: TransactionMetaData = {
      accountOwners: [
        {
          userId: 1,
          name: 'Jeremy'
        },
        {
          userId: 2,
          name: 'Julie'
        }
      ]
    };

    return of(helloMetaData);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    // TODO http call. for now create an id of < 100...
    transaction.id = Math.floor(Math.random() * Math.floor(100));
    return of(transaction);
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
