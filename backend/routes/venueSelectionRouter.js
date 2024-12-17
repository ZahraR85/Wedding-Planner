import express from 'express';
import { 
  createVenueSelection, 
  getUserVenueSelections 
} from '../controllers/venueSelectionController.js';
import { isAuthenticated } from '../middleware/RoleAccess.js';

const router = express.Router();

// User Routes
router.post('/', isAuthenticated, createVenueSelection); // Create a venue selection
router.get('/', isAuthenticated, getUserVenueSelections); // Get all venue selections for the logged-in user

export default router;
