import express from 'express';
import {
  createOrUpdateShoppingCard,
  getShoppingCard,
  removeFromShoppingCard,
  clearShoppingCard,
} from '../controllers/shoppingCardController.js';

const router = express.Router();

// Add a service to the shopping card
router.post('/', createOrUpdateShoppingCard);

// Get user's shopping card
router.get('/', getShoppingCard);

// Remove a service from the shopping card
router.delete('/', removeFromShoppingCard);

// Clear user's shopping card
router.delete('/:id', clearShoppingCard);

export default router;
