import { Document } from "mongoose";

export interface TicketType extends Document {
  eventId: string;
  ticketType: string;
  numberOfTicketsAvailable: number;
  price: number;
  [key: string]: any;
}
