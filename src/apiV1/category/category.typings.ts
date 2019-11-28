import { Document } from "mongoose";

export interface CategoryType extends Document {
  name: string;
  deleted: boolean;
  [key: string]: any;
}
