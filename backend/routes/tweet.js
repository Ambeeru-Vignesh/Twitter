import express from "express";
const router = express.Router();

import { createTweet, getUserTweets } from "../controllers/tweet.js";

router.post("/createTweet", createTweet);
router.get("/userTweets/:id", getUserTweets);

export default router;
