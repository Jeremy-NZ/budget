export interface ITransaction {
    accountId: number;
    amount: number;
    date: Date;
    id: number;
    merchant: string;
    // The merchant as described by the bank on the account statement etc
    bankMerchantDescription: string;
    userId: number;
    split: ITransactionSplit[];
    // TODO: budget
}

export interface ITransactionSplit {
    amount: number;
    userId: number;
}
