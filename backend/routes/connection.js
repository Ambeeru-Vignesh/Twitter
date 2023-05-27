import express from "express";
const router = express.Router();

import { follow, unfollow } from "../controllers/connection.js";

router.post("/follow/:id", follow);
router.delete("/unfollow/:id", unfollow);

export default router;
