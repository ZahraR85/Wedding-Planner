import ShoppingCard from '../models/shoppingCard.js';
import mongoose from "mongoose";

// Add or update service in the shopping card
export const createOrUpdateShoppingCard = async (req, res) => {
  try {
    const { userID, serviceName, price } = req.body;

    // Validate required fields
    if (!userID || !serviceName || typeof price !== 'number') {
      return res.status(400).json({ message: "User ID, Service Name, and Price are required." });
    }

    // Check if an entry already exists for the user and service
    const existingCardEntry = await ShoppingCard.findOne({ userID, serviceName });

    if (existingCardEntry) {
      // Update the existing entry
      existingCardEntry.price = price;

      await existingCardEntry.save();

      return res.status(200).json({
        message: "Shopping card entry updated successfully.",
        cart: existingCardEntry,
      });
    }

    // Create a new entry if none exists
    const newCartEntry = await ShoppingCard.create({
      userID,
      serviceName,
      price,
    });

    return res.status(201).json({
      message: "Shopping card entry created successfully.",
      cart: newCartEntry,
    });
  } catch (error) {
    console.error("Error in createOrUpdateShoppingCard:", error.message);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Get user's shopping card
export const getShoppingCard = async (req, res) => {
  const { userID } = req.query;

  try {
    if (!userID) {
      return res.status(400).json({ message: 'UserID is required.' });
    }

    const cardItems = await ShoppingCard.find({ userID });

    if (!cardItems.length) {
      return res.status(200).json({ cardItems: [], totalPrice: 0 }); // Return empty response
    }

    const totalPrice = cardItems.reduce((sum, item) => sum + item.price, 0);

    res.status(200).json({ cardItems, totalPrice });
  } catch (error) {
    console.error("Error in getShoppingCard:", error.message);
    res.status(500).json({ message: 'Error fetching shopping card', error: error.message });
  }
};

// Remove a service from shopping card
export const removeFromShoppingCard = async (req, res) => {
  const { userID, serviceName } = req.body;

  try {
    if (!userID || !serviceName) {
      return res.status(400).json({ message: 'UserID and ServiceName are required.' });
    }

    // Find and delete the matching service
    const deletedItem = await ShoppingCard.findOneAndDelete({ userID, serviceName });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Service not found in the shopping card.' });
    }

    // Fetch updated shopping card to calculate total price
    const cardItems = await ShoppingCard.find({ userID });
    const totalPrice = cardItems.reduce((sum, item) => sum + item.price, 0);

    return res.status(200).json({
      message: 'Service removed successfully.',
      cardItems,
      totalPrice,
    });
  } catch (error) {
    console.error('Error in removeFromShoppingCard:', error.message);
    return res.status(500).json({ message: 'Failed to remove service.', error: error.message });
  }
};


// Clear the shopping card
export const clearShoppingCard = async (req, res) => {
  const { userID } = req.params;

  try {
    if (!userID) {
      return res.status(400).json({ message: 'UserID is required.' });
    }

    await ShoppingCard.deleteMany({ userID });

    res.status(200).json({ message: 'Shopping card cleared successfully.' });
  } catch (error) {
    console.error("Error in clearShoppingCard:", error.message);
    res.status(500).json({ message: 'Failed to clear shopping card.', error: error.message });
  }
};
