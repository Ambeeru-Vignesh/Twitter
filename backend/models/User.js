import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
    },
    profile: {
      type: String,
    },
    followers: {
      type: Array,
      defaultValue: [],
    },
    following: {
      type: Array,
      defaultValue: [],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
