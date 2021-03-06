import mongoose, { Schema } from "mongoose";
import uuid4 from "uuid/v4";
import { OnlineTicketWalletType } from "./onlineTicketWallet.typings";

export interface OnlineTicketWalletSchema
  extends OnlineTicketWalletType,
    mongoose.Document {}

const OnlineTicketWallet = new mongoose.Schema(
  {
    // onlineTicketId: {
    //   type: String
    // },
    _id: {
      type: String,
      default: uuid4
    },

    userId: {
      type: String,
      required: true,
      ref: "User"
    },
    pagaReferenceKey: {
      type: String,
      default: ""
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true, toObject: { virtuals: true } }
);

OnlineTicketWallet.virtual("users", {
  ref: "User",
  localField: "userId",
  justOnce: true,
  foreignField: "_id"
});
// OnlineTicketWallet.pre<OnlineTicketWalletSchema>("save", function() {
//   if (this.isNew) {
//     this.OnlineTicketId = uuid4();
//   }
// });

export default mongoose.model<OnlineTicketWalletSchema>(
  "OnlineTicketWallet",
  OnlineTicketWallet
);
