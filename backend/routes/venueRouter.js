import express from 'express';
import { 
  createOrUpdateVenue, 
  getAllVenues, 
  getVenueById, 
  updateVenue, 
  deleteVenue 
} from '../controllers/venueController.js';
import { isAuthenticated, isAdmin } from '../middleware/RoleAccess.js';

const router = express.Router();

// Admin Routes
router.post('/', /*isAuthenticated, isAdmin,*/ createOrUpdateVenue); // Add venue
router.put('/:id', isAuthenticated, isAdmin, updateVenue); // Update venue
router.delete('/:id', isAuthenticated, isAdmin, deleteVenue); // Delete venue

// Public/User Routes
router.get('/', /*isAuthenticated,*/ getAllVenues); // Get all venues
router.get('/:id', isAuthenticated, getVenueById); // Get a single venue by ID

export default router;
