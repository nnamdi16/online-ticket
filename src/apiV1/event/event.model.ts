import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { EventType } from "./event.typings";

export interface EventSchema extends EventType, mongoose.Document {}

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
      required: true
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
      type: String,
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

    status: {
      type: Boolean
    }
  },
  { id: false, timestamps: true }
);
// Status includes, deleted, postponed,cancelled

Events.pre<EventSchema>("save", function() {
  if (this.isNew) {
    this.eventId = uuid4();
  }
});

export default mongoose.model<EventSchema>("Event", Events);
