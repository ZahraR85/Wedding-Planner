import express from "express";
import {
  createVenue,
  updateVenue,
  deleteVenue,
  getVenueByVenueId,
  getVenuesByUserId,
  getAllVenues,
} from "../controllers/venueController.js";
import { upload1 } from "../middleware/cloudinaryUploadMiddleware.js";

const router = express.Router();

// POST: Create a venue
router.post("/", upload1.array("images", 15), createVenue);

// GET: Get all venues
router.get("/", getAllVenues);

// PUT: Update a venue
router.put("/:venueId", upload1.array("images", 15), updateVenue);

// DELETE: Delete a venue
router.delete("/:venueId", deleteVenue);

// GET: Get a specific venue by ID
router.get("/:venueId", getVenueByVenueId);

// GET: Get venues by user ID
router.get("/user/:userId", getVenuesByUserId);

export default router;
