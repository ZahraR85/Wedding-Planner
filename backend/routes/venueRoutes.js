import express from "express";
import { createVenue, getAllVenues, updateVenue, deleteVenue } from "../controllers/venueController.js";
import { upload } from "../middleware/uploadMiddleware.js"; // Middleware for handling file uploads.

const router = express.Router();

router.post("/", upload.array("images", 15), createVenue);
// GET: Get all venues
router.get("/", getAllVenues);

// PUT: Update a venue
router.put("/:venueId", updateVenue);

// DELETE: Delete a venue
router.delete("/:venueId", deleteVenue);

export default router;
