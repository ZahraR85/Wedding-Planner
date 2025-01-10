import express from 'express';
import {
  createOrUpdatePhotography,
  getAllPhotographyEntries,
  getPhotographyByUserId,
  getPhotographyByQuery,
  
} from '../controllers/photographyController.js';

const router = express.Router();

// Routes
router.post("/", createOrUpdatePhotography); // Create or update a photography entry


router.get("/", getPhotographyByQuery);      // Handle query-based fetching
router.get("/all", getAllPhotographyEntries); // Fetch all entries explicitly
router.get("/:id", getPhotographyByUserId);  // Fetch a single entry by ID

export default router;
