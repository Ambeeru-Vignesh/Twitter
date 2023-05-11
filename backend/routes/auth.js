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

router.post("/forgotPassword", forgetPassword);
router.post("/resetpassword", resetPassword);

export default router;
