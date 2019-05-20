import { AccountType } from './account-type';
import { AccountOwner } from './account-owner';

export class Account {
    id: number;
    balance: number;
    name: string;
    type: AccountType;
    owners: AccountOwner[];
}

export interface IAccountOwner {
    userId: number;
    name: string;
}

export class CreditAccount extends Account {
    availableCredit: number;
    creditLimit: number;
    type = AccountType.credit;
}

export class DebitAccount extends Account {
    type = AccountType.debit;
}
