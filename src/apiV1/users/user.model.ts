// import * as mongoose from "mongoose";
// const Schema = mongoose.Schema;
import mongoose from "mongoose";
import { UserType } from "./user.typings";
import uuid4 from "uuid/v4";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import CONFIG from "../../config/config";

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
    isPlanner: {
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

User.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(Number(CONFIG.SALT_ROUNDS)).toString("hex");
  return (this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"));
};

User.methods.comparePassword = (
  password: string,
  salt: string,
  hashedPassword: string
) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
  return hashedPassword === hash;
};

User.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return (this.token = jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt((expirationDate.getTime() / 100).toString(), 10)
    },
    "secret"
  ));
};

User.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    salt: this.salt,
    token: this.token,
    password: this.setPassword(this.password)
  };
};

User.pre<UserSchema>("save", function() {
  if (this.isNew) {
    this.userId = uuid4();
  }
});

export default mongoose.model<UserSchema>("User", User);
