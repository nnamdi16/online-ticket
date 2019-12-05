import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { OnlineTicketWalletType } from "./onlineTicketWallet.typings";

export interface OnlineTicketWalletSchema
  extends OnlineTicketWalletType,
    mongoose.Document {}

const OnlineTicketWallet = new mongoose.Schema({
  OnlineTicketId: {
    type: String
  },

  userId: {
    type: String,
    required: true
  },
  pagaReferenceKey: {
    type: String,
    default: ""
  },
  amount: {
    type: Number,
    default: 0
  }
});

OnlineTicketWallet.pre<OnlineTicketWalletSchema>("save", function() {
  if (this.isNew) {
    this.OnlineTicketId = uuid4();
  }
});

export default mongoose.model<OnlineTicketWalletSchema>(
  "OnlineTicketWallet",
  OnlineTicketWallet
);