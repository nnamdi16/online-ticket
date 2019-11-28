import { Document } from "mongoose";

export interface TransactionType extends Document {
  customerId: string;
  productsId: string;
  cashierId: string;
  total: number;
  [key: string]: any;
}
