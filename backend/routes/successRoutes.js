/*import express from "express";
import { removeAllFromShoppingCard } from './controllers/shoppingCardController';  // Ensure correct import

router.get('/', async (req, res) => {
  const sessionId = req.query.session_id;
  const userId = req.query.user_id;  // Assuming user_id is passed in the query to identify the user

  try {
    // Handle payment confirmation by checking the session ID (or any other logic you want to use)
    // After successful payment, remove items from shopping card and related services
    await removeAllFromShoppingCard({ userID: userId });

    res.send(`Payment successful, session ID: ${sessionId}. Your services have been removed from the cart.`);
  } catch (error) {
    console.error('Error during success handler:', error);
    res.status(500).send('Failed to clear shopping card and services after payment.');
  }
});
export default router;
*/