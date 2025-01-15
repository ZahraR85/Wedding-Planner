import express from "express";
import {
  createVenue,
  updateVenue,
  deleteVenue,
  getVenueByVenueId,
  getVenuesByUserId,
  getAllVenues,
  getUniqueCities,
} from "../controllers/venueController.js";
import fileUploader from "../middleware/multer.js";
import cloudUploader from "../middleware/cloudinaryMultiple.js";


const router = express.Router();



router.get("/cities", getUniqueCities);

// POST: Create a venue
router.post("/", fileUploader.array("images", 15), cloudUploader, createVenue);

// GET: Get all venues
router.get("/", getAllVenues);

// PUT: Update a venue
router.put("/:venueId", fileUploader.array("images", 15),cloudUploader, updateVenue);

// DELETE: Delete a venue
router.delete("/:venueId", deleteVenue);

// GET: Get a specific venue by ID
router.get("/:venueId", getVenueByVenueId);

// GET: Get venues by user ID
router.get("/user/:userId", getVenuesByUserId);



export default router;
