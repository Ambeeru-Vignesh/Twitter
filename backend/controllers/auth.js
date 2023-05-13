import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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
    console.log(req.body);
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

const forgetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user === null) {
    res.status(400);
    throw new Error("could not find");
  }
  console.log(user);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.resetToken = token;
  await user.save();
  console.log(token);
  const resetLink = `http://localhost:3000/resetpassword?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link <a href="${resetLink}">here</a>, or paste this into your browser to complete the process:\n\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Sorry, there was an error sending the email" });
    } else {
      console.log("Email sent: " + token);
      res.status(200).json({
        message: "Email sent, Please check your gmail",
      });
    }
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  const { password } = req.body;
  console.log(password);

  // if (!user) {
  //   res.status(400);
  //   throw new Error("Invalid user data");
  // }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      throw new Error(err.message);
    } else {
      console.log("yes success");

      const user = await User.findOne({ resetToken: token });
      if (user) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          user.password = hashedPassword;
          await user.save();
          res.send({
            message: "Password reseted successfully",
          });
        }
      } else {
        res.status(404).send({ message: "User not found" });
      }
    }
  });
});

export { signUp, signIn, forgetPassword, resetPassword };
