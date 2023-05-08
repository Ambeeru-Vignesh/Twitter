import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App is running");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
