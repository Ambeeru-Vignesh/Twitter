import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const signUp = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    user.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
});

const signIn = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid user data");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid user data");
    }
    const token = generateToken(user._id);
    const { password, ...othersData } = user._doc;
    res.status(200).json({
      othersData,
    });
  } catch (error) {
    next(error);
  }
});

export { signUp, signIn };
