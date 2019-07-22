import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Account } from '../account';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnChanges {
  @Input() account: Account;

  showCreditDetails = false;


  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.account) {
      const account: Account = changes.account.currentValue;
      this.showCreditDetails = account.isCreditAccount();
      console.log(this.showCreditDetails);
    }
  }
  //   if (changes.account && this.transactionForm){
  //     this.paymentOptions = this.getPaymentOptions(this.account.owners);
  //     this.displayPaidBy = Array.isArray(this.paymentOptions) && this.paymentOptions.length > 1;
  //     if (this.displayPaidBy) {
  //       this.transactionForm.patchValue({'paymentOption': this.paymentOptions[0]});
  //     }
  //   }
  // }
}
