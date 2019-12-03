import { Document } from "mongoose";

export interface TransactionType extends Document {
  eventId: string;
  ticketId: string;
  amount: string;
  userId:string;
  transactionRef: number;
  status:string
  [key: string]: any;
}
