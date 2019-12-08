import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { TransactionType } from "./transaction.typings";

export interface TransactionSchema extends TransactionType, mongoose.Document {}

const Transaction = new mongoose.Schema(
  {
    transactionId: {
      type: String
    },
    eventId: {
      type: String,
      required: true
    },
    ticketId: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    userId: {
      type: String,
      required: true
    },
    transactionRef: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    onlineTicketId: {
      type: String
    }
  },

  { id: false, timestamps: true }
);

Transaction.pre<TransactionSchema>("save", function() {
  if (this.isNew) {
    this.transactionId = uuid4();
  }
});

export default mongoose.model<TransactionSchema>("Transaction", Transaction);
