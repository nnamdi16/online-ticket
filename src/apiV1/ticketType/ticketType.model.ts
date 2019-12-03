import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { TicketType } from "./ticketType.typings";

export interface TicketSchema extends TicketType, mongoose.Document {}

const Ticket = new mongoose.Schema({
  ticketTypeId: {
    type: String
  },

  ticketId: {
    type: String,
    required: true
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

Ticket.pre<TicketSchema>("save", function() {
  if (this.isNew) {
    this.ticketTypeId = uuid4();
  }
});

export default mongoose.model<TicketSchema>("Ticket", Ticket);
