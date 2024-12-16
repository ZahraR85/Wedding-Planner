import Makeup from "../models/makeup.js";

// Create a new makeup for a user
export const createMakeup = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging
    const { userID, makeup, dress, nail, hairstyle, shoes, special } = req.body;

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const feature = await Makeup.create({
      userID,
      makeup,
      dress,
      nail,
      hairstyle,
      shoes,
      special,
    });

    res.status(201).json({ message: "Makeup created successfully", feature });
  } catch (error) {
    console.error("Error in createMakeup:", error); // Debugging
    res.status(500).json({ message: "Error creating feature", error });
  }
};

// Get all makeups
// export const getMakeups = async (req, res) => {
//   try {
//     const makeups = await Makeup.find().populate("userID");
//     res.status(200).json(makeups);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching makeups", error });
//   }
// };



export const getMakeups = async (req, res) => {
  try {
    // Get userID from query parameters or request body
    const userID = req.query.userID || req.body.userID;

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user's Makeup selections
    const music = await Makeup.findOne({ userID })
      .populate('userID', 'name family') // Populate user's name and family

      console.log(music);

    if (!music) {
      return res.status(404).json({ message: "No selections found for this user" });
    }

    // Return the entire user's music data
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