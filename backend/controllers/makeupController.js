import Makeup from "../models/makeup.js";
import mongoose from "mongoose";

export const createOrUpdateMakeup = async (req, res) => {
  try {
    const { userID, makeup, dress, nail, hairstyle, shoes, special } = req.body;

 

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    // Calculate the total price
    const total =
      (makeup ? 300 : 0) +
      (dress ? 500 : 0) +
      (nail ? 70 : 0) +
      (hairstyle ? 200 : 0) +
      (shoes ? 100 : 0) +
      (special ? 300 : 0);

   


    const updateData = {
      makeup: { selected: makeup || false, price: 300 },
      dress: { selected: dress || false, price: 500 },
      nail: { selected: nail || false, price: 70 },
      hairstyle: { selected: hairstyle || false, price: 200 },
      shoes: { selected: shoes || false, price: 100 },
      special: { selected: special || false, price: 300 },
      total, 
    };




    // Update or create the document
    const feature = await Makeup.findOneAndUpdate(
      { userID: new mongoose.Types.ObjectId(userID) },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

  
    res.status(200).json({ message: "Makeup updated successfully", feature });
  } catch (error) {
    console.error("Error in createOrUpdateMakeup:", error);
    res.status(500).json({ message: "Error saving makeup data", error });
  }
};




export const getMakeups = async (req, res) => {
  try {
   
    const userID = req.query.userID || req.body.userID;

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user's Makeup selections
    const music = await Makeup.findOne({ userID })
      .populate('userID', 'name family') // Populate user's name and family

     

    if (!music) {
      return res.status(404).json({ message: "No selections found for this user" });
    }

 
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user selections", error });
  }
};


// Get a makeup by ID
export const getMakeupById = async (req, res) => {
  try {
    const { id } = req.params;
    const makeup = await Makeup.findById(id).populate("userID");

    if (!makeup) {
      return res.status(404).json({ message: "Makeup not found" });
    }

    res.status(200).json(makeup);
  } catch (error) {
    res.status(500).json({ message: "Error fetching makeup", error });
  }
};

// Update a makeup
export const updateMakeup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const makeup = await Makeup.findByIdAndUpdate(id, updatedData, { new: true });

    if (!makeup) {
      return res.status(404).json({ message: "Makeup not found" });
    }

    res.status(200).json({ message: "Makeup updated successfully", makeup });
  } catch (error) {
    res.status(500).json({ message: "Error updating makeup", error });
  }
};

// Delete a makeup
export const deleteMakeup = async (req, res) => {
  try {
    const { id } = req.params;

    const makeup = await Makeup.findByIdAndDelete(id);

    if (!makeup) {
      return res.status(404).json({ message: "Makeup not found" });
    }

    res.status(200).json({ message: "Makeup deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting makeup", error });
  }
};  
