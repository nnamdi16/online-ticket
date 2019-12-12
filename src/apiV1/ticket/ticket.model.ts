import mongoose, { Schema } from "mongoose";
import uuid4 from "uuid/v4";
import uuid from "uuid";
import { Ticket } from "./ticket.typings";

export interface TicketSchema extends Ticket, mongoose.Document {}

const Ticket = new mongoose.Schema(
  {
    // ticketId: {
    //   type: String
    // },

    _id: {
      type: String,
      default: uuid4
    },

    ticketTypeId: {
      type: String,
      ref: "TicketType",
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      ref: "User",
      required: true
    },
    numberOfTickets: {
      type: Number,
      required: true
    }
  },

  {
    timestamps: true
  }
);

// Ticket.pre<TicketSchema>("save", function() {
//   if (this.isNew) {
//     this.ticketId = uuid4();
//   }
// });

export default mongoose.model<TicketSchema>("Ticket", Ticket);
