import { Document } from "mongoose";

export interface ItemType extends Document {
  title: string;
  description: string;
  price: number;
  deleted: boolean;
  location: string;
  category: string;
  startDate: Date;
  endDate: Date;
  time: Date;
  noOfAttendees: number;
  eventUrl: string;
  imageUrl: string;
  authorId: string;
  [key: string]: any;
}
