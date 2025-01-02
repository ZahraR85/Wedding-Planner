import Reception from "../models/reception.js";
import mongoose from "mongoose";

export const createOrUpdateReception = async (req, res) => {
  try {
    const { userID, Starter, MainCourse, Dessert, ColdDrink, CafeBar, Fruiets, Cake, Waiter } = req.body;

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    // Prepare the data for updating or creating
    const updateData = {
      Starter: { Number: Starter || 0, price: 5 },
      MainCourse: { Number: MainCourse || 0, price: 15 },
      Dessert: { Number: Dessert || 0, price: 6 },
      ColdDrink: { Number: ColdDrink || 0, price: 7 },
      CafeBar: { Number: CafeBar || 0, price: 4 },
      Fruiets: { Number: Fruiets || 0, price: 9 },
      Cake: { Number: Cake || 0, price: 3 },
      Waiter: { Number: Waiter || 0, price: 20 },
    };

    // Calculate the total price based on the number of each item and its price
    const totalPrice = Object.keys(updateData).reduce((total, feature) => {
      return total + updateData[feature].Number * updateData[feature].price;
    }, 0);

    // Add the total price to the data
    updateData.total = totalPrice;

    // Log userID and data to ensure correctness
    console.log('UserID:', userID);
    console.log('Update Data:', updateData);

    // Update or create the reception entry in the database
    const reception = await Reception.findOneAndUpdate(
      { userID: new mongoose.Types.ObjectId(userID) },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Check if the reception object was updated or created
    if (!reception) {
      console.log("No reception found or created");
      return res.status(404).json({ message: "Reception not found or created" });
    }

    console.log("Updated Reception:", reception);
    res.status(200).json({ message: "Reception updated successfully", reception });
  } catch (error) {
    console.error("Error in createOrUpdateReception:", error);
    res.status(500).json({ message: "Error saving reception data", error });
  }
};





// Get all Receptions
export const getReceptions = async (req, res) => {
  try {
    const userID = req.query.userID || req.body.userID;

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const receptions = await Reception.findOne({ userID }).populate("userID", "name family");

    if (!receptions) {
      return res.status(404).json({ message: "No receptions found for this user" });
    }

    res.status(200).json(receptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching receptions", error });
  }
};

// Get a Reception by ID
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

// Update a Reception
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

// Delete a Reception
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
