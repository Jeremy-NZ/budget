import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transaction';
import { TransactionMetaData } from '../TransactionMetaData';
import { AccountOwner } from '../AccountOwner';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { TransactionSplitType } from './TransactionPaymentType';
import { TransactionPaymentOption } from './TransactionPaymentOption';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = 'Add Transaction';
  transactionForm: FormGroup;
  transaction: Transaction;

  @Input() currentTransaction: Transaction;
  @Input() transactionMetaData: TransactionMetaData;
  @Output() createTransaction = new EventEmitter<Transaction>();
  @Output() updateTransaction = new EventEmitter<Transaction>();

  componentActive = true;
  displayBreakdown = false;
  paymentOptions: TransactionPaymentOption[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentOptions = this.getPaymentOptions(this.transactionMetaData.accountOwners);

    this.transactionForm = this.formBuilder.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      merchant: [''],
      bankMerchantDescription: [''],
      paymentOption: [this.paymentOptions[0]],
      // todo init array here
      transactionSplit: ['', Validators.required]
    });

    this.transactionForm.get('amount').valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => this.onTransactionSplitChange());

    this.transactionForm.get('paymentOption').valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => this.onTransactionSplitChange());
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.currentTransaction) {
      const transaction: any = changes.currentTransaction.currentValue as Transaction;
      this.displayTransaction(transaction);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  displayTransaction(transaction: Transaction | null): void {
    // Set the local transaction property
    this.transaction = transaction;

    if (this.transaction && this.transactionForm) {
      // Reset the form back to pristine
      this.transactionForm.reset();

      // Display the appropriate page title
      if (this.transaction.id === 0) {
        this.pageTitle = 'Add Transaction';
      } else {
        // TODO: add getDescription() to txn interface
        this.pageTitle = `Edit Transaction: ${this.transaction.id}`;
      }

      // Update the data on the form
      this.transactionForm.patchValue({
        amount: this.transaction.amount,
        date: this.transaction.date,
        merchant: this.transaction.merchant,
        bankMerchantDescription: this.transaction.bankMerchantDescription
      });
    }
  }

  saveTransaction() {
    if (this.transactionForm.valid && this.transactionForm.dirty) {
      // Copy over all of the original transaction properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const t = { ...this.transaction, ...this.transactionForm.value };
      if (t.id) {
        this.updateTransaction.emit(t);
      } else {
        this.createTransaction.emit(t);
      }
    }
  }

  private getPaymentOptions(accountOwners: AccountOwner[]): TransactionPaymentOption[] {
    const options: TransactionPaymentOption[] = [];
    accountOwners.forEach(accountOwner => {
      options.push({
        description: accountOwner.name,
        displayBreakdown: false,
        type: TransactionSplitType.none,
        userId: accountOwner.userId
      });
    });

    options.push({ description: 'Even split', displayBreakdown: false, type: TransactionSplitType.even});
    options.push({ description: 'Odd split', displayBreakdown: true, type: TransactionSplitType.odd});

    return options;
  }

  // TODO refactor this method to be more granular and to avoid transactionForm.setControl?
  private onTransactionSplitChange(): void {
    // get the transaction amount
    const amount: number = this.transactionForm.get('amount').value;
    const paymentOption = this.transactionForm.get('paymentOption').value as TransactionPaymentOption;
    this.displayBreakdown = paymentOption.displayBreakdown;
    const transactionSplit: FormArray = this.formBuilder.array([]);

    if (paymentOption.type === TransactionSplitType.none) {
      transactionSplit.push(this.formBuilder.group({
        amount,
        name: paymentOption.description,
        userId: paymentOption.userId
      }));
    } else {
      // todo address rounding issues. e.g. 100 / 3
      const amountPerPerson = amount / this.transactionMetaData.accountOwners.length;
      this.transactionMetaData.accountOwners.forEach(accountOwner => {
        const split = this.formBuilder.group({
          amount: amountPerPerson,
          name: accountOwner.name,
          userId: accountOwner.userId
        });
        transactionSplit.push(split);
      });
    }
    this.transactionForm.setControl('transactionSplit', transactionSplit);
  }
}
