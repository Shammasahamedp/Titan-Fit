// interfaces/payment.interface.ts

import { Document, Types } from 'mongoose';

export interface IPayment extends Document {
  userId: Types.ObjectId;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
//   paymentMethod: 'upi' | 'bank' | 'card';
  transactionId: string;
  type: 'subscription' | 'trainer';
  subscriptionId?: Types.ObjectId;
  trainerId?: Types.ObjectId;
  createdAt: Date;
}
