import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["General", "Admin"],
    },
    email: {
      type: String,
      required: false,
    },
    following: String,
    followers: String,
    review: String,
    favorites: String,
  },
  { versionKey: false, collection: "users" }
);

export default UserSchema;
