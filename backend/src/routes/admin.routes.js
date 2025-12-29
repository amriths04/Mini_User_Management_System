import express from "express";
import {
  getAllUsers,
  activateUser,
  deactivateUser
} from "../controllers/adminController.js";

import { protect } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
const router = express.Router();


router.get("/users", protect, requireAdmin, getAllUsers);
router.patch("/users/:id/activate", protect, requireAdmin, activateUser);
router.patch("/users/:id/deactivate", protect, requireAdmin, deactivateUser);

export default router;
