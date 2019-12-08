import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { TicketType } from "./ticketType.typings";

export interface TicketTypeSchema extends TicketType, mongoose.Document {}

const TicketType = new mongoose.Schema({
  ticketTypeId: {
    type: String
  },
  eventId: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    required: true
  },

  numberOfTickets: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  }
});

TicketType.pre<TicketTypeSchema>("save", function() {
  if (this.isNew) {
    this.ticketTypeId = uuid4();
  }
});

export default mongoose.model<TicketTypeSchema>("Ticket", TicketType);
