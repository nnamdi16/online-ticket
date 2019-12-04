import { Document } from "mongoose";

export interface PagaWallet extends Document {
  deleted: boolean;
  userId: string;
  pagaReferenceKey: string;
  amount: number;
  [key: string]: any;
}
