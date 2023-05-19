import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  following: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  followers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
