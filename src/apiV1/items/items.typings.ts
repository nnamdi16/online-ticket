import { Document } from "mongoose";

export interface ItemType extends Document {
  name: string;
  quantity: number;
  categoryId: string;
  price: number;
  deleted: boolean;
  [key: string]: any;
}
