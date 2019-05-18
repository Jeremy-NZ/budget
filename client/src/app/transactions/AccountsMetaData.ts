import { AccountOwner } from './AccountOwner';

export interface AccountMetaData {
    id: number;
    name: string;
    owners: AccountOwner[];
    type: AccountType;
}

export enum AccountType {
    debit,
    credit
}
