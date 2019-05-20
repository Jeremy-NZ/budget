import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent {
  @Input() account: Account;
}
