import { AccountType } from './account-type';
import { Account } from './account';
export class CreditAccount extends Account {
    
    constructor() {
        super();
    }
    
    availableCredit: number;
    creditLimit: number;
    type = AccountType.credit;
}
