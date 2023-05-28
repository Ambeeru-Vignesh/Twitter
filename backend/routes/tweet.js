import express from "express";
const router = express.Router();

import { createTweet, getUserTweets } from "../controllers/tweet.js";
import { getHome } from "../controllers/homeController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/createTweet", createTweet);
router.get("/userTweets/:id", getUserTweets);
router.get("/home", protect, getHome);

export default router;
