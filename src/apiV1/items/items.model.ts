import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { ItemType } from "./items.typings";
import { number, string, boolean } from "@hapi/joi";

export interface ItemSchema extends ItemType, mongoose.Document {}

const Item = new mongoose.Schema(
  {
    ItemId: {
      type: String
    },

    name: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    categoryId: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    deleted: {
      type: Boolean
    }
  },
  { id: false, timestamps: true }
);

Item.pre<ItemSchema>("save", function() {
  if (this.isNew) {
    this.itemId = uuid4();
  }
});

export default mongoose.model<ItemSchema>("Item", Item);
