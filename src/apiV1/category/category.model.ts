import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { CategoryType } from "./category.typings";

export interface CategorySchema extends CategoryType, mongoose.Document {
  categoryId: string;
}

const Category = new mongoose.Schema(
  {
    categoryId: {
      type: String
    },

    name: {
      type: String,
      required: true
    },

    deleted: {
      type: Boolean
    }
  },
  {
    id: false,
    timestamps: true
  }
);

Category.pre<CategorySchema>("save", function() {
  if (this.isNew) {
    this.categoryId = uuid4();
  }
});

export default mongoose.model<CategorySchema>("Category", Category);
