import { Document } from "mongoose";

export interface TransactionType extends Document {
  eventId: string;
  ticketId: string;
  amount: number;
  userId: string;
  transactionRef: string;
  status: string;
  [key: string]: any;
}
