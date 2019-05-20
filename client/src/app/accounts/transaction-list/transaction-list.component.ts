import { Component, OnInit, Input } from '@angular/core';
import { ITransaction } from '../transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  @Input() transactions: ITransaction[] ;

  constructor() { }

  ngOnInit() {
  }

}
