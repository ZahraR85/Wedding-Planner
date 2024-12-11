import Photography from "../models/photograghy.js";

// Create a new photography entry
export const createPhotographyEntry = async (req, res) => {
  try {
    const photographyData = new Photography(req.body);
    await photographyData.save();
    res.status(201).json({ message: "Photography entry created successfully!", data: photographyData });
  } catch (error) {
    res.status(500).json({ error: "Failed to create photography entry.", details: error.message });
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

// Get a specific photography entry by ID
export const getPhotographyById = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await Photography.findById(id).populate("userId", "name email");
    if (!entry) {
      return res.status(404).json({ error: "Photography entry not found." });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photography entry.", details: error.message });
  }
};

// Update a photography entry by ID
export const updatePhotographyEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEntry = await Photography.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEntry) {
      return res.status(404).json({ error: "Photography entry not found." });
    }
    res.status(200).json({ message: "Photography entry updated successfully!", data: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: "Failed to update photography entry.", details: error.message });
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
