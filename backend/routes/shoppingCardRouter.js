import express from 'express';
import {
  createOrUpdateShoppingCard,
  getShoppingCard,
  removeFromShoppingCard,
  clearShoppingCard,
} from '../controllers/shoppingCardController.js';

const router = express.Router();

// Add or update a service in the shopping card
router.post('/', createOrUpdateShoppingCard);

// Get user's shopping card
router.get('/', getShoppingCard);

// Remove a specific service from the shopping card
router.delete('/', removeFromShoppingCard);

// Clear all items from the user's shopping card
router.delete('/clear/:userID', clearShoppingCard);

export default router;
