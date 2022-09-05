import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { getDatabase } from "../utilities/env";
import { USER } from "../utilities/constant";

const MONGO_SALT = process.env.MONGO_SALT;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
    required: true,
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

UserSchema.methods.generateHash = function generateHash(value) {
  return bcrypt.hash(value, MONGO_SALT);
};

UserSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compare(password, this.password);
};

const myDB = mongoose.connection.useDb(getDatabase());

export default myDB.model(USER, UserSchema);
