import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { TicketType } from "./ticket.typings";

export interface TicketSchema extends TicketType, mongoose.Document {}

const Ticket = new mongoose.Schema(
  {
    ticketId: {
      type: String
    },

    ticketTypeId: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    userId: {
      type: Boolean
    }
  },
  {
    id: false,
    timestamps: true
  }
);

Ticket.pre<TicketSchema>("save", function() {
  if (this.isNew) {
    this.ticketId = uuid4();
  }
});

export default mongoose.model<TicketSchema>("Ticket", Ticket);
