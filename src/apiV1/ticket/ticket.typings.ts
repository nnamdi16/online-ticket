import { Document } from "mongoose";

export interface Ticket extends Document {
  deleted: boolean;
  ticketTypeId:string;
  amount:string;
  userId:string,
  quantity:number
  [key: string]: any;
}
