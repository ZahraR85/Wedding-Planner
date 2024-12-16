import Photography from "../models/photography.js";
import mongoose from "mongoose";

// Create or update photography
export const createOrUpdatePhotography = async (req, res) => {
  try {
    const { userId, photography, videography, clipConstruction, physicalAlbum, giftImageSize } = req.body;
    console.log("Received Data:", req.body);

    if (!userId) {
      return res.status(400).json({ message: "UserID is required." });
    }

    // Calculate the total price
    const total =
      (photography ? photography.number * (photography.price || 300) : 0) +
      (videography ? videography.number * (videography.price || 300) : 0) +
      (clipConstruction ? clipConstruction.number * (clipConstruction.price || 200) : 0) +
      (physicalAlbum && physicalAlbum.selected ? physicalAlbum.price || 500 : 0) +
      (giftImageSize ? giftImageSize.number * (giftImageSize.price || 10) : 0);

    console.log("Calculated Total:", total);

    // Prepare the data to update
    const updateData = {
      photography: { ...photography, price: photography?.price || 300 },
      videography: { ...videography, price: videography?.price || 300 },
      clipConstruction: { ...clipConstruction, price: clipConstruction?.price || 200 },
      physicalAlbum: { ...physicalAlbum, price: physicalAlbum?.price || 500 },
      giftImageSize: { ...giftImageSize, price: giftImageSize?.price || 10 },
      total, // Include the calculated total
    };

    console.log("Photography:", photography ? photography.number * (photography.price || 300) : 0);
    console.log("Videography:", videography ? videography.number * (videography.price || 300) : 0);
    console.log("Clip Construction:", clipConstruction ? clipConstruction.number * (clipConstruction.price || 200) : 0);
    console.log("Physical Album:", physicalAlbum && physicalAlbum.selected ? physicalAlbum.price || 500 : 0);
    console.log("Gift Image Size:", giftImageSize ? giftImageSize.number * (giftImageSize.price || 10) : 0);
    console.log("Calculated Total:", total);

    // Update or create the document
    const feature = await Photography.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("Updated Feature:", feature);
    res.status(200).json({ message: "Photography data updated successfully.", feature });
  } catch (error) {
    console.error("Error in createOrUpdatePhotography:", error);
    res.status(500).json({ message: "Error saving photography data.", error });
  }
};

// Get all photography entries
export const getAllPhotographyEntries = async (req, res) => {
  try {
    const entries = await Photography.find().populate("userId", "name email"); // Populate user details
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photography entries.", details: error.message });
  }
};

// Get a specific photography entry by UserID
export const getPhotographyByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const entry = await Photography.findOne({ userId: mongoose.Types.ObjectId(userId) });
    console.log("Fetched photography entry:", entry); // Log fetched data

    if (!entry) {
      return res.status(404).json({ message: "No photography data found for this user." });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error("Error in getPhotographyByUserId:", error);
    res.status(500).json({ message: "Failed to fetch photography data.", error });
  }
};

// Update a photography entry by ID
export const updatePhotographyEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const photography = await Photography.findByIdAndUpdate(id, updatedData, { new: true });
    console.log("Received Data:", req.body);

    if (!photography) {
      return res.status(404).json({ message: "Photography entry not found" });
    }

    res.status(200).json({ message: "Photography updated successfully", photography });
  } catch (error) {
    res.status(500).json({ message: "Error updating photography", error });
  }
};

// Delete a photography entry by ID
export const deletePhotographyEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await Photography.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ error: "Photography entry not found." });
    }

    res.status(200).json({ message: "Photography entry deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete photography entry.", details: error.message });
  }
};
