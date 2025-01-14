import Venue from "../models/venue.js";
//import fs from 'fs';
//import path from 'path';

import cloudinary from "../config/cloudinary.js";

export const createVenue = async (req, res) => {
  try {
    const { userId, name, city, capacity, price, discount, address, description, latitude, longitude } = req.body;

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload_stream({
          folder: "venues",
        });
        return result.secure_url; // Store the secure URL from Cloudinary
      })
    );

    const venue = new Venue({
      userId,
      name,
      city,
      capacity,
      price,
      discount,
      address,
      description,
      latitude,
      longitude,
      images: uploadedImages, // Save Cloudinary URLs in the database
    });

    await venue.save();
    res.status(201).json({ message: "Venue created successfully!", venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating venue", error });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { name, city, capacity, price, discount, address, description, latitude, longitude, removeImages } = req.body;

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Remove specified images from Cloudinary
    if (removeImages) {
      const removeImagesArray = JSON.parse(removeImages);
      removeImagesArray.forEach(async (imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
        await cloudinary.uploader.destroy(`venues/${publicId}`);
        venue.images = venue.images.filter((img) => img !== imageUrl);
      });
    }

    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload_stream({
          folder: "venues",
        });
        return result.secure_url;
      })
    );

    venue.images.push(...uploadedImages);
    venue.name = name || venue.name;
    venue.city = city || venue.city;
    venue.capacity = capacity || venue.capacity;
    venue.price = price || venue.price;
    venue.discount = discount || venue.discount;
    venue.address = address || venue.address;
    venue.description = description || venue.description;
    venue.latitude = latitude || venue.latitude;
    venue.longitude = longitude || venue.longitude;

    await venue.save();
    res.status(200).json({ message: "Venue updated successfully", venue });
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ message: "Error updating venue", error });
  }
};



// Delete a venue
export const deleteVenue = async (req, res) => {
  try {
    const { venueId } = req.params;

    // Find and delete the venue
    const venue = await Venue.findByIdAndDelete(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting venue", error });
  }
};

// Get a specific venue by venue ID
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

// Get venues by user ID
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

// Get unique cities
export const getUniqueCities = async (req, res) => {
  try {
    const cities = await Venue.distinct("city"); // Fetch distinct cities
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Error fetching cities", error });
  }
};

// Get all venues
export const getAllVenues = async (req, res) => {
  try {
    const { city } = req.query; // Extract city from query parameters
    const filter = city && city !== "All Cities" ? { city } : {}; // Build the filter object

    const venues = await Venue.find(filter); // Apply filter when fetching venues
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Error fetching venues", error });
  }
};
// Update a price of venue
/*export const updateVenuePrice = async (req, res) => {
  try {
    const { venueId } = req.params;
    const updatedVenue = await Venue.findByIdAndUpdate(venueId, req.body, { new: true });
    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error });
  }
};
*/