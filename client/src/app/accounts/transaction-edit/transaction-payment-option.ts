import { TransactionSplitType } from './transaction-payment-type';
export interface TransactionPaymentOption {
  description: string;
  displayBreakdown: boolean;
  type: TransactionSplitType;
  userId?: number;
}
