import express from 'express';
import {
  //createOrUpdateVenueSelection,
  createVenueSelection,
  getVenueSelectionsByUserId,
  deleteVenueSelection,
  checkBookingConflict,
} from '../controllers/venueSelectionController.js';

const router = express.Router();

// Create or update a venue selection
//router.post('/', createOrUpdateVenueSelection);
router.post('/', createVenueSelection);
// Get venue selections by user ID
router.get("/:userId", getVenueSelectionsByUserId);

// Delete venue selection
router.delete('/:id/:venueId', deleteVenueSelection);

router.get('/venue/:venueId/date/:date', checkBookingConflict);
export default router;
