import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit, OnChanges {
  pageTitle = 'Add Transaction';
  transactionForm: FormGroup;
  transaction: Transaction;

  @Input() currentTransaction: Transaction;
  @Output() createTransaction = new EventEmitter<Transaction>();
  @Output() updateTransaction = new EventEmitter<Transaction>();


  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    // TODO: update form to split amount
    // Create the form. 
    this.transactionForm = this.formBuilder.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      merchant: [''],
      bankMerchantDescription: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.currentTransaction) {
      const transaction: any = changes.currentTransaction.currentValue as Transaction;
      this.displayTransaction(transaction);
    }
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

}
