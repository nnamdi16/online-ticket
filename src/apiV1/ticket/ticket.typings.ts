import { Document } from "mongoose";

export interface Ticket extends Document {
  // deleted: boolean;
  ticketTypeId: string;
  eventId: string;
  price: string;
  userId: string;
  numberOfTickets: number;
  [key: string]: any;
}
