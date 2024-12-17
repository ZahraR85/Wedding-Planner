import VenueSelection from '../models/venueSelection.js';

// Create a venue selection
export const createVenueSelection = async (req, res) => {
  try {
    const { venueId, hours, date } = req.body;
    const newSelection = await VenueSelection.create({ 
      venueId, 
      hours, 
      date, 
      userId: req.user._id 
    });
    res.status(201).json(newSelection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all venue selections for the logged-in user
export const getUserVenueSelections = async (req, res) => {
  try {
    const selections = await VenueSelection.find({ userId: req.user._id }).populate('venueId');
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





/*import Venue from "../models/venue.js";
import mongoose from "mongoose";

// Create or update venue
export const createOrUpdateVenue = async (req, res) => {
  try {
    const { userId, name, city, images, capacity, price, discount, address, location } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserID is required." });
    }

    // Calculate the total price after discount
    const total = price - (price * (discount || 0) / 100);  // Total = price - (price * discount)

    const updateData = {
      userId,
      name,
      city,
      images,
      capacity,
      price,
      discount,
      address,
      location,
      total, // Store the calculated total
    };

    const venue = await Venue.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Venue data updated successfully.", venue });
  } catch (error) {
    console.error("Error in createOrUpdateVenue:", error);
    res.status(500).json({ message: "Error saving venue data.", error });
  }
};

// Get all venues
export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate("userId", "name email"); // Populate user details
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch venue entries.", details: error.message });
  }
};

// Get a specific venue by UserID
export const getVenueById = async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const venue = await Venue.findOne({ userId: mongoose.Types.ObjectId(userId) });
    console.log("Fetched venue entry:", venue); // Log fetched data

    if (!venue) {
      return res.status(404).json({ message: "No venue data found for this user." });
    }

    res.status(200).json(venue);
  } catch (error) {
    console.error("Error in getVenueByUserId:", error);
    res.status(500).json({ message: "Failed to fetch venue data.", error });
  }
};

// Update a venue entry by ID
export const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const venue = await Venue.findByIdAndUpdate(id, updatedData, { new: true });
    console.log("Received Data:", req.body);

    if (!venue) {
      return res.status(404).json({ message: "Venue entry not found" });
    }

    res.status(200).json({ message: "Venue updated successfully", venue });
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error });
  }
};

// Delete a venue entry by ID
export const deleteVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVenue = await Venue.findByIdAndDelete(id);

    if (!deletedVenue) {
      return res.status(404).json({ error: "Venue entry not found." });
    }

    res.status(200).json({ message: "Venue entry deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete venue entry.", details: error.message });
  }
};
*/