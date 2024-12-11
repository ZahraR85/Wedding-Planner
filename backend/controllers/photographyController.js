import Photography from "../models/photograghy.js";

// Create Photography Entry
export const createPhotography = async (req, res) => {
  try {
    const photography = new Photography(req.body);
    await photography.save();
    res.status(201).json({ message: "Photography data created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create photography data." });
  }
};

// Update Photography Entry
export const updatePhotography = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedData = await Photography.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found!" });
    }
    res.status(200).json({ message: "Data updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update data." });
  }
};
