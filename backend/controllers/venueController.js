import Venue from "../models/venue.js";
import mongoose from "mongoose";

// Create a new venue
export const createVenue = async (req, res) => {
  try {
    const { userId, name, city, images, capacity, price, discount, address, location } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required." });

    const newVenue = new Venue({
      userId,
      name,
      city,
      images,
      capacity,
      price,
      discount,
      address,
      location
    });

    await newVenue.save();
    res.status(201).json({ message: "Venue created successfully.", venue: newVenue });
  } catch (error) {
    console.error("Error in createVenue:", error);
    res.status(500).json({ message: "Error creating venue.", error });
  }
};

// Update an existing venue
export const updateVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const updatedData = req.body;

    const venue = await Venue.findByIdAndUpdate(venueId, updatedData, { new: true });

    if (!venue) return res.status(404).json({ message: "Venue not found." });

    res.status(200).json({ message: "Venue updated successfully.", venue });
  } catch (error) {
    console.error("Error in updateVenue:", error);
    res.status(500).json({ message: "Error updating venue.", error });
  }
};

// Delete a venue entry by ID
export const deleteVenue = async (req, res) => {
  try {
    const { venueId } = req.params;

    const deletedVenue = await Venue.findByIdAndDelete(venueId);

    if (!deletedVenue) return res.status(404).json({ message: "Venue not found." });

    res.status(200).json({ message: "Venue deleted successfully." });
  } catch (error) {
    console.error("Error in deleteVenue:", error);
    res.status(500).json({ message: "Error deleting venue.", error });
  }
};

// Get all venues
export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate("userId", "name email");
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Failed to fetch venues.", error });
  }
};
// Get a specific venue by Venue ID
export const getVenueByVenueId = async (req, res) => {
  try {
    const { venueId } = req.params;

    const venue = await Venue.findById(venueId);

    if (!venue) return res.status(404).json({ message: "Venue not found." });

    res.status(200).json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ message: "Failed to fetch venue.", error });
  }
};

export const getVenuesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const venues = await Venue.find({ userId });

    if (!venues.length) return res.status(404).json({ message: "No venues found for this user." });

    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues by user:", error);
    res.status(500).json({ message: "Failed to fetch venues.", error });
  }
};

