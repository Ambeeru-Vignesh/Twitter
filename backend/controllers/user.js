import User from "../models/User";
import Tweet from "../models/Tweet";
import asyncHandler from "express-async-handler";

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
});
