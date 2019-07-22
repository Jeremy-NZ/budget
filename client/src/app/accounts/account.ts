import { AccountType } from './account-type';
import { AccountOwner } from './account-owner';

export abstract class Account {
    id: number;
    balance: number;
    name: string;
    type: AccountType;
    owners: AccountOwner[];

    isCreditAccount(): boolean {
        return this.type === AccountType.credit;
    }
}
