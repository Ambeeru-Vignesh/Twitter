import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db";

connectDB();

const app = express();
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App is running");
});
