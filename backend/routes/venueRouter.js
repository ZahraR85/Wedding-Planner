import express from "express";
import {
  createVenue,
  updateVenue,
  deleteVenue,
  getAllVenues,
  getVenueByVenueId,
  getVenuesByUserId,
} from "../controllers/venueController.js";

import { isAuthenticated, isAdmin } from "../middleware/RoleAccess.js";

const router = express.Router();

// Admin Routes - Only for venue management
router.post("/", createVenue); // Create a new venue
router.put("/:venueId", isAuthenticated, isAdmin, updateVenue); // Update venue by ID
router.delete("/:venueId", isAuthenticated, isAdmin, deleteVenue); // Delete venue by ID

// Public/User Routes
router.get("/", getAllVenues); // Get all venues
router.get("/:venueId", getVenueByVenueId); // Get a single venue by venue ID
router.get("/user/:userId", isAuthenticated, getVenuesByUserId); // Get venues by user ID

export default router;
