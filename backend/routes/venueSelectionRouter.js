import express from 'express';
import {
  //createOrUpdateVenueSelection,
  createVenueSelection,
  updateVenueSelectionByNewVenueId,
  getVenueSelectionsByUserId,
  deleteVenueSelection,
  checkBookingConflict,
} from '../controllers/venueSelectionController.js';

const router = express.Router();


//router.post('/', createOrUpdateVenueSelection);
router.post('/', createVenueSelection);
// Get venue selections by user ID
router.get("/:userId", getVenueSelectionsByUserId);
router.put("/:userId", updateVenueSelectionByNewVenueId);
// Delete venue selection
router.delete('/:id/:venueId', deleteVenueSelection);

router.get('/venue/:venueId/date/:date', checkBookingConflict);
export default router;
