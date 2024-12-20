import express from 'express';
import {
  createOrUpdatePhotography,
  getAllPhotographyEntries,
  getPhotographyByUserId,
  deletePhotographyEntry,
} from '../controllers/photographyController.js';

const router = express.Router();

// Routes
router.post("/", createOrUpdatePhotography); // Create or update a photography entry
router.get("/", getAllPhotographyEntries); // Get all photography entries
router.get("/:id", getPhotographyByUserId); // Get photography entry by user ID
router.delete("/:id", deletePhotographyEntry); // Delete a photography entry by ID

export default router;
