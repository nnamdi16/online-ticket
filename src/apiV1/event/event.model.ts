import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { ItemType } from "./event.typings";

export interface ItemSchema extends ItemType, mongoose.Document {}

const Events = new mongoose.Schema(
  {
    eventId: {
      type: String
    },

    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date
    },

    time: {
      type: Date,
      required: true
    },

    noOfAttendees: {
      type: Number,
      required: true
    },
    eventUrl: {
      type: String
    },
    imageUrl: {
      type: String
    },

    authorId: {
      type: String
    },

    deleted: {
      type: Boolean
    }
  },
  { id: false, timestamps: true }
);

Events.pre<ItemSchema>("save", function() {
  if (this.isNew) {
    this.itemId = uuid4();
  }
});

export default mongoose.model<ItemSchema>("Event", Events);
