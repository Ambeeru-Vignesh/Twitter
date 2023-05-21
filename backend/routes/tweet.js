import express from "express";
const router = express.Router();

import { createTweet } from "../controllers/tweet.js";

router.post("/createTweet", createTweet);

export default router;
