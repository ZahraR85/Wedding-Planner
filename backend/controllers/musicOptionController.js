import MusicOption from "../models/musicOption.js";

// Create a new music option
export const createMusicOption = async (req, res) => {
  try {
    const newOption = new MusicOption(req.body);
    const savedOption = await newOption.save();
    res.status(201).json(savedOption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all music options
export const getAllMusicOptions = async (req, res) => {
  try {
    const options = await MusicOption.find();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single music option by ID
export const getMusicOptionById = async (req, res) => {
  try {
    const option = await MusicOption.findById(req.params.id);
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a music option by ID
export const updateMusicOption = async (req, res) => {
  try {
    const updatedOption = await MusicOption.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOption) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.status(200).json(updatedOption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a music option by ID
export const deleteMusicOption = async (req, res) => {
  try {
    const deletedOption = await MusicOption.findByIdAndDelete(req.params.id);
    if (!deletedOption) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.status(200).json({ message: "Option deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};