import Photography from "../models/photography.js";
import mongoose from "mongoose";

// Create or Update Photography
export const createOrUpdatePhotography = async (req, res) => {
  try {
    const { userID, photography, videography, clipConstruction, physicalAlbum, giftImageSize } = req.body;

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }
    
    // Ensure the userID is a valid ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userID);
    
    const total =
      (photography?.number || 0) * (photography?.price || 300) +
      (videography?.number || 0) * (videography?.price || 300) +
      (clipConstruction?.number || 0) * (clipConstruction?.price || 200) +
      (physicalAlbum?.selected ? (physicalAlbum?.price || 500) : 0) +
      (giftImageSize?.number || 0) * (giftImageSize?.price || 10);
    
    const updateData = {
      photography: { number: photography?.number || 0, price: photography?.price || 300 },
      videography: { number: videography?.number || 0, price: videography?.price || 300 },
      clipConstruction: { number: clipConstruction?.number || 0, price: clipConstruction?.price || 200 },
      physicalAlbum: { selected: physicalAlbum?.selected || false, price: physicalAlbum?.price || 500 },
      giftImageSize: { number: giftImageSize?.number || 0, price: giftImageSize?.price || 10 },
      total,
    };
    
    const photographyEntry = await Photography.findOneAndUpdate(
      { userID: userObjectId }, // Use new ObjectId
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    res.status(200).json({ message: "Photography data updated successfully", photographyEntry });
    
  } catch (error) {
    console.error("Error in createOrUpdatePhotography:", error);
    res.status(500).json({ message: "Error updating photography data", error: error.message });
  }
};

// Get All Photography Entries
export const getAllPhotographyEntries = async (req, res) => {
  try {
    // Fetch all photography entries from the database
    const entries = await Photography.find().populate("userID", "name email"); // Optionally populate user details

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photography entries", error: error.message });
  }
};

// Get Photography by User ID
export const getPhotographyByUserId = async (req, res) => {
  const { id: userID } = req.params;
  try {
    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const entry = await Photography.findOne({ userID: mongoose.Types.ObjectId(userID) }).populate("userID", "name email");

    if (!entry) {
      return res.status(404).json({ message: "No photography data found for this user." });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photography data", error: error.message });
  }
};

// Update Photography Entry
export const updatePhotographyEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEntry = await Photography.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ message: "Photography entry not found" });
    }

    res.status(200).json({ message: "Photography entry updated successfully", updatedEntry });
  } catch (error) {
    res.status(500).json({ message: "Error updating photography entry", error: error.message });
  }
};

// Delete Photography Entry
export const deletePhotographyEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await Photography.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Photography entry not found." });
    }

    res.status(200).json({ message: "Photography entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting photography entry", error: error.message });
  }
};
