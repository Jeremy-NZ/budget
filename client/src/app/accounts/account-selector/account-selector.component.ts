import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements OnChanges, OnDestroy, OnInit {
  @Input() accounts: Account[];
  @Output() selectAccount = new EventEmitter<Account>();

  accountSelectorForm: FormGroup;
  componentActive = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountSelectorForm = this.formBuilder.group({account: []});

    // setup dynamic behavior
    this.accountSelectorForm.get('account').valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => this.onAccountChange());
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.accounts && this.accountSelectorForm) {
      this.accountSelectorForm.patchValue({account: this.accounts[0]});
    }
  }

  private onAccountChange(): void {
    const selectedAccount: Account = this.accountSelectorForm.get('account').value;
    this.selectAccount.emit(selectedAccount);
  }
}
