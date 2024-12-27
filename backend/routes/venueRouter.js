import express from "express";
import {
  createVenue,
  updateVenue,
  deleteVenue,
  getAllVenues,
  getVenueByVenueId,
  getVenuesByUserId,
} from "../controllers/venueController.js";

import { adminOnly } from "../middleware/auth.js"; // Import the middlewares

const router = express.Router();

// Admin Routes - Only for venue management
router.post("/", adminOnly, createVenue); // Create a new venue (Admin only)
router.put("/:venueId", adminOnly, updateVenue); // Update venue by ID (Admin only)
router.delete("/:venueId", adminOnly, deleteVenue); // Delete venue by ID (Admin only)

// Public/User Routes
router.get("/", getAllVenues); // Get all venues (Public)
router.get("/:venueId", getVenueByVenueId); // Get a single venue by venue ID (Public)
router.get("/user/:userId", getVenuesByUserId); // Get venues by user ID (Authenticated users)

export default router;
