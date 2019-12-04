import { Document } from "mongoose";

export interface TicketType extends Document {
  eventId: string;
  type:string
  numberOfTickets: number;
  price: number;
  [key: string]: any;
}
