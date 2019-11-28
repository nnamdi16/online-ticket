import { Document } from "mongoose";

export interface UserType extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isSuper: boolean;
  deleted: boolean;
  hash: string;
  salt: string;
  [key: string]: any;
}
