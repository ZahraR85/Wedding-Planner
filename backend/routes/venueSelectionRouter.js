import express from 'express';
import {
  createOrUpdateVenueSelection,
  getVenueSelectionsByUserId,
  deleteVenueSelection,
} from '../controllers/venueSelectionController.js';

const router = express.Router();

// Create or update a venue selection
router.post('/', createOrUpdateVenueSelection);

// Get venue selections by user ID
router.get("/:userId", getVenueSelectionsByUserId);

// Delete venue selection
router.delete('/:id/:venueId', deleteVenueSelection);

export default router;
