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
        message: "Shopping cart entry updated successfully.",
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
      message: "Shopping cart entry created successfully.",
      cart: newCartEntry,
    });
  } catch (error) {
    console.error("Error in createOrUpdateShoppingCard:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get user's shopping card
export const getShoppingCard = async (req, res) => {
  const { userID } = req.query; // Extract userID from query parameters

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
    res.status(500).json({ message: 'Error fetching shopping card', error });
  }
};

// Remove a service from shopping card
export const removeFromShoppingCard = async (req, res) => {
  const { userID, serviceName } = req.body;

  try {
    await ShoppingCard.findOneAndDelete({ userID, serviceName });

    const cardItems = await ShoppingCard.find({ userID });
    const totalPrice = cardItems.reduce((sum, item) => sum + item.price, 0);

    res.status(200).json({ message: 'Service removed', cardItems, totalPrice });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove service', error });
  }
};

// Clear the shopping card
export const clearShoppingCard = async (req, res) => {
  const { userID } = req.params;

  try {
    // Remove all services associated with the user
    await ShoppingCard.deleteMany({ userID });

    res.status(200).json({ message: 'Shopping card cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear shopping card', error });
  }
};
