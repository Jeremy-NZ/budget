import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transaction';
import { AccountMetaData } from '../AccountsMetaData';
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


  @Input() currentTransaction: Transaction;
  @Input() accountsMetaData: AccountMetaData[];
  @Output() createTransaction = new EventEmitter<Transaction>();
  @Output() updateTransaction = new EventEmitter<Transaction>();

  componentActive = true;
  displayBreakdown = false;
  displayPaidBy = false;
  paymentOptions: TransactionPaymentOption[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // create form object
    this.transactionForm = this.formBuilder.group({
      account: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      merchant: [''],
      bankMerchantDescription: [''],
      paymentOption: [''],
      transactionSplit: ['', Validators.required]
    });

    // setup dynamic behavior
    this.transactionForm.get('account').valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => this.onAccountChange());

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
      const transaction: Transaction = changes.currentTransaction.currentValue;
      this.displayTransaction(transaction);
    }

    if (changes.accountsMetaData && this.transactionForm) {
      this.transactionForm.get('account').patchValue(this.accountsMetaData[0]);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  displayTransaction(transaction: Transaction | null): void {
    // Set the local transaction property
    this.currentTransaction = transaction;

    if (this.currentTransaction && this.transactionForm) {
      // Reset the form back to pristine
      this.transactionForm.reset();

      // Display the appropriate page title
      if (this.currentTransaction.id === 0) {
        this.pageTitle = 'Add Transaction';
      } else {
        // TODO: add getDescription() to txn interface
        this.pageTitle = `Edit Transaction: ${this.currentTransaction.id}`;
      }

      // Update the data on the form
      this.transactionForm.patchValue({
        amount: this.currentTransaction.amount,
        date: this.currentTransaction.date,
        merchant: this.currentTransaction.merchant,
        bankMerchantDescription: this.currentTransaction.bankMerchantDescription
      });
    }
  }

  saveTransaction() {
    if (this.transactionForm.valid && this.transactionForm.dirty) {
      // Copy over all of the original transaction properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const t = { ...this.currentTransaction, ...this.transactionForm.value };
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

    // only add split options if more than one person owns the account
    if (accountOwners.length > 1) {
      options.push({ description: 'Even split', displayBreakdown: false, type: TransactionSplitType.even });
      options.push({ description: 'Odd split', displayBreakdown: true, type: TransactionSplitType.odd });
    }

    return options;

  }
  private onAccountChange(): void {
    const currentAccount: AccountMetaData = this.transactionForm.get('account').value;
    this.displayPaidBy = currentAccount.owners.length > 1;
    this.paymentOptions = this.getPaymentOptions(currentAccount.owners);
    this.transactionForm.get('paymentOption').setValue(this.paymentOptions[0]);
  }

  // TODO refactor this method to be more granular and to avoid transactionForm.setControl?
  private onTransactionSplitChange(): void {
    // get the transaction amount
    const amount: number = this.transactionForm.get('amount').value;
    const paymentOption: TransactionPaymentOption = this.transactionForm.get('paymentOption').value;
    const currentAccount: AccountMetaData = this.transactionForm.get('account').value;
    const transactionSplit: FormArray = this.formBuilder.array([]);

    if (paymentOption.type === TransactionSplitType.none) {
      transactionSplit.push(this.formBuilder.group({
        amount,
        name: paymentOption.description,
        userId: paymentOption.userId
      }));
    } else {
      // todo address rounding issues. e.g. 100 / 3
      const amountPerPerson = amount / currentAccount.owners.length;
      currentAccount.owners.forEach(accountOwner => {
        const split = this.formBuilder.group({
          amount: amountPerPerson,
          name: accountOwner.name,
          userId: accountOwner.userId
        });
        transactionSplit.push(split);
      });
    }

    this.transactionForm.setControl('transactionSplit', transactionSplit);

    // finally show/hide the transaction split input(s)
    this.displayBreakdown = paymentOption.displayBreakdown;
  }
}
