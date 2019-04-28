import { TransactionSplitType } from './TransactionPaymentType';
export interface TransactionPaymentOption {
  description: string;
  displayBreakdown: boolean;
  type: TransactionSplitType;
  userId?: number;
}
