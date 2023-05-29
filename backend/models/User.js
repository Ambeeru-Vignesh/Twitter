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
    bio: {
      type: String,
      maxlength: 160,
    },
    location: {
      type: String,
      maxlength: 30,
    },
    website: {
      type: String,
      maxLength: 100,
    },
    DOB: Date,
    profilePicture: String,
    coverPicture: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
