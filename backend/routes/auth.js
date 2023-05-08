import express from "express";
const router = express.Router();
import {
  signUp,
  signIn,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.js";

router.post("/signUp", signUp);
router.post("/signIn", signIn);

router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

export default router;
