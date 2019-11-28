// import * as mongoose from "mongoose";
// const Schema = mongoose.Schema;
import mongoose from "mongoose";
import { UserType } from "./user.typings";
import uuid4 from "uuid/v4";

export interface UserSchema extends UserType, mongoose.Document {}
const User = new mongoose.Schema(
  {
    userId: {
      type: String
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    isAdmin: {
      type: Boolean
    },

    isSuper: {
      type: Boolean
    },

    deleted: {
      type: Boolean
    },
    salt: {
      type: String
    },
    hash: {
      type: String
    },
    token: {
      type: String
    }
  },
  {
    id: false,
    timestamps: true,
    useNestedStrict: true
  }
);

User.pre<UserSchema>("save", function() {
  if (this.isNew) {
    this.userId = uuid4();
  }
});

export default mongoose.model("User", User);
