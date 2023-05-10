import express from "express";
const router = express.Router();
import {
  signUp,
  signIn,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.js";

router.post("/signup", signUp);
router.post("/signin", signIn);

router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

export default router;
