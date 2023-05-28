import express from "express";
const router = express.Router();

import { createTweet, getUserTweets } from "../controllers/tweet.js";
import { getHome } from "../controllers/homeController.js";

router.post("/createTweet", createTweet);
router.get("/userTweets/:id", getUserTweets);
router.get("/home", getHome);

export default router;
