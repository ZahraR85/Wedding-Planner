import Reception from "../models/reception.js";

// Create a new reception for a user
export const createReception = async (req, res) => {
    try {
      const { userID, Starter, MainCourse, Dessert, ColdDrink, CafeBar, Fruiets,Cake,Waiter } = req.body;
  
      // Create a new feature document
      const feature = await Reception.create({
        userID,
        Starter,
        MainCourse,
        Dessert,
        ColdDrink,
        CafeBar,
        Fruiets,
        Cake,
        Waiter,
      });
  
      res.status(201).json({ message: "Reception created successfully", feature });
    } catch (error) {
      res.status(500).json({ message: "Error creating feature", error });
    }
  };

// Get all receptions
export const getReceptions = async (req, res) => {
  try {
    const receptions = await Reception.find().populate("userID");
    res.status(200).json(receptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching receptions", error });
  }
};

// Get a reception by ID
export const getReceptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const reception = await Reception.findById(id).populate("userID");

    if (!reception) {
      return res.status(404).json({ message: "Reception not found" });
    }

    res.status(200).json(reception);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reception", error });
  }
};

// Update a reception
export const updateReception = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const reception = await Reception.findByIdAndUpdate(id, updatedData, { new: true });

    if (!reception) {
      return res.status(404).json({ message: "Reception not found" });
    }

    res.status(200).json({ message: "Reception updated successfully", reception });
  } catch (error) {
    res.status(500).json({ message: "Error updating reception", error });
  }
};

// Delete a reception
export const deleteReception = async (req, res) => {
  try {
    const { id } = req.params;

    const reception = await Reception.findByIdAndDelete(id);

    if (!reception) {
      return res.status(404).json({ message: "Reception not found" });
    }

    res.status(200).json({ message: "Reception deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reception", error });
  }
};