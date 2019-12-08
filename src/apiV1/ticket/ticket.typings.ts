import { Document } from "mongoose";

export interface TicketType extends Document {
  deleted: boolean;
  ticketTypeId:string;
  amount:string;
  userId:string,
  quantity:number
  [key: string]: any;
}
