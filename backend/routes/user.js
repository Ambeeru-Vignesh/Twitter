import express from "express";
const router = express.Router();

import { getFollowers, getFollowing } from "../controllers/connection.js";

// Related To connection
router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);

export default router;
