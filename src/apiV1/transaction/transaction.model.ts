import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { TransactionType } from "./transaction.typings";

export interface TransactionSchema extends TransactionType, mongoose.Document {}

const Transaction = new mongoose.Schema(
  {
    serviceId: {
      type: String
    },
    customerId: {
      type: String
    },
    productsId: {
      type: String
    },

    cashierId: {
      type: String
    },

    total: {
      type: Number
    }
  },

  { id: false, timestamps: true }
);

Transaction.pre<TransactionSchema>("save", function() {
  if (this.isNew) {
    this.serviceId = uuid4();
  }
});

export default mongoose.model<TransactionSchema>("Transaction", Transaction);
