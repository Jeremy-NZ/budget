export interface Transaction {
    amount: number;
    date: Date;
    id: number;
    merchant: string;
    // The merchant as described by the bank on the account statement etc
    bankMerchantDescription: string;
    userId: number;
    split: TransactionSplit[];
    // TODO: budget
}

export interface TransactionSplit {
    amount: number;
    userId: number;
}
