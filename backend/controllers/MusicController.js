import Music from "../models/music.js";

// Create a new user music selection
export const createMusicSelection = async (req, res) => {
  try {
    const newSelection = new Music(req.body);
    const savedSelection = await newSelection.save();
    res.status(201).json(savedSelection);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Get a single user's music selection by ID
export const getMusicSelectionById = async (req, res) => {
  try {
    const selection = await Music.findById(req.params.id).populate(
      "selections.optionID"
    );
    if (!selection) {
      return res.status(404).json({ message: "Selection not found" });
    }
    res.status(200).json(selection);
  } catch (error) {
    res.status(500).json({ message: error.message });
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