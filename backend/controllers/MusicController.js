import Music from "../models/Music.js";
import mongoose from "mongoose";


// Create a new user music selection
// export const createMusicSelection = async (req, res) => {
//   try {
//     const newSelection = new Music(req.body);
//     const savedSelection = await newSelection.save();
//     res.status(201).json(savedSelection);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const createOrUpdateMusic = async (req, res) => {
  try {
    const { userID, selections, customRequests } = req.body;

    console.log("Received Data:", req.body);

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    // Calculate totalCost based on selections
    const totalCost = selections.reduce((total, selection) => {
      return total + (selection.totalPrice || 0);
    }, 0);

    console.log("Calculated Total Cost:", totalCost);

    // Prepare the data to update
    const updateData = {
      selections: selections || [],
      customRequests: customRequests || [],
      totalCost,
    };

    console.log("Data to Update:", updateData);

    // Find and update the document or create a new one
    const musicRecord = await Music.findOneAndUpdate(
      { userID: new mongoose.Types.ObjectId(userID) }, // Match by userID
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true } // Update or insert with defaults
    );

    console.log("Updated Music Record:", musicRecord);
    res.status(200).json({ message: "Music updated successfully", musicRecord });
  } catch (error) {
    console.error("Error in createOrUpdateMusic:", error);
    res.status(500).json({ message: "Error saving music data", error });
  }
};



// Get all user music selections
export const getAllMusicSelections = async (req, res) => {
  try {
    const selections = await Music.find().populate("selections.optionID");
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserSelectionById = async (req, res) => {
  try {
    // Get userID from query parameters or request body
    const userID = req.query.userID || req.body.userID;

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user's music selections
    // Populate user details and music option details
    const music = await Music.findOne({ userID })
      .populate('userID', 'name family') // Populate user's name and family
      .populate('selections.optionID');  // Populate optionID details
    console.log("Fetching data for userID:", userID);
    console.log("Populated Music Data:", music);

    if (!music) {
      return res.status(404).json({ message: "No selections found for this user" });
    }

    // Return the entire user's music data
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user selections", error });
  }
};





// Update a user's music selection by ID
export const updateMusicSelection = async (req, res) => {
  try {
    const updatedSelection = await Music.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("selections.optionID");
    if (!updatedSelection) {
      return res.status(404).json({ message: "Selection not found" });
    }
    res.status(200).json(updatedSelection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user's music selection by ID
export const deleteMusicSelection = async (req, res) => {
  try {
    const deletedSelection = await Music.findByIdAndDelete(req.params.id);
    if (!deletedSelection) {
      return res.status(404).json({ message: "Selection not found" });
    }
    res.status(200).json({ message: "Selection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


