import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { PagaWallet } from "./pagaWallet.typings";
import { string, number } from "joi";

export interface PagaWalletSchema extends PagaWallet, mongoose.Document {}

const PagaWallet = new mongoose.Schema({
  pagaWalletId: {
    type: String
  },

  userId: {
    type: String,
    required: true
  },
  pagaReferenceKey: {
    type: String,
    required: true
  },
  amount: {
    type: number,
    required: true
  }
});

PagaWallet.pre<PagaWalletSchema>("save", function() {
  if (this.isNew) {
    this.pagaWalletId = uuid4();
  }
});

export default mongoose.model<PagaWalletSchema>("PagaWallet", PagaWallet);
