import express from "express";
import { registerForEvent, getUserRegistrations } from "../controllers/registrationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register for event
router.post("/", protect, registerForEvent);

// Get logged-in user's registrations
router.get("/mine", protect, getUserRegistrations);

export default router;
