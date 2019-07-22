import { AccountType } from './account-type';
import { Account } from './account';
export class DebitAccount extends Account {
    constructor() {
        super();
    }
    type = AccountType.debit;
}
