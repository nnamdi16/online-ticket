import mongoose, { Schema } from "mongoose";
import uuid4 from "uuid/v4";
import { TransactionType } from "./transaction.typings";

export interface TransactionSchema extends TransactionType, mongoose.Document {}

const Transaction = new mongoose.Schema(
  {
    // ticketTransactionId: {
    //   type: String
    // },
    _id: {
      type: String,
      default: uuid4
    },
    eventId: {
      type: String,
      ref: "Event"
      // required: true
    },
    ticketId: {
      type: String,
      ref: "Ticket"
      // required: true
    },

    amount: {
      type: Number
      // required: true
    },

    userId: {
      type: String,
      ref: "User",
      required: true
    },
    transactionRef: {
      type: String
      // required: true
    },
    status: {
      type: String
      // required: true
    },
    onlineTicketWalletId: {
      type: String
    },
    transactionType: {
      type: String
      // required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },

  { id: false, timestamps: true }
);

Transaction.methods.setTransactionRef = function(transactionId: string) {
  return (this.transactionRef = transactionId);
};

Transaction.methods.setAmount = function(price: number) {
  return (this.amount = price);
};

Transaction.pre<TransactionSchema>("save", function() {
  if (this.isNew) {
    this.ticketTransactionId = uuid4();
  }
});

export default mongoose.model<TransactionSchema>("Transaction", Transaction);
