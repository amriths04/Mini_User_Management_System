import express from "express";
import {
  signup,
  login,
  getMe,
  logout
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

router.get("/me", protect, getMe);
router.post("/logout", protect, logout);


export default router;
