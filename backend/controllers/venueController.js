import Venue from "../models/venue.js";
//import fs from 'fs';
//import path from 'path';
import { v2 as cloudinary } from "cloudinary";

export const createVenue = async (req, res) => {
  try {
    const { userId, name, city, capacity, price, discount, address, description, latitude, longitude } = req.body;

    // Extract Cloudinary URLs from req.files
    const uploadedImages = req.cloudinaryURLs;

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
      images: uploadedImages,
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

    // Remove specified images from Cloudinary and venue record
    if (removeImages) {
      let removeImagesArray;
      try {
        removeImagesArray = JSON.parse(removeImages);
      } catch (e) {
        return res.status(400).json({ message: "Invalid removeImages format" });
      }

      if (Array.isArray(removeImagesArray)) {
        await Promise.all(
          removeImagesArray.map(async (imageUrl) => {
            if (typeof imageUrl === 'string') {
              const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
              await cloudinary.uploader.destroy(publicId);
              venue.images = venue.images.filter((img) => img !== imageUrl);
            }
          })
        );
      } else {
        return res.status(400).json({ message: "removeImages should be an array of strings" });
      }
    }

    // Add new images from req.files
    const newImages = req.cloudinaryURLs;
    if (newImages && newImages.length > 0) {
      venue.images.push(...newImages);
    }

    // Update other venue details
    Object.assign(venue, {
      name: name || venue.name,
      city: city || venue.city,
      capacity: capacity || venue.capacity,
      price: price || venue.price,
      discount: discount || venue.discount,
      address: address || venue.address,
      description: description || venue.description,
      latitude: latitude || venue.latitude,
      longitude: longitude || venue.longitude,
    });

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