import Guest from "../models/guest.js";


export const createGuest = async (req, res) => {
  try {
    const { userID, guestName, numberOfPersons, phone, address, answerStatus, email } = req.body;
    console.log(req.body);

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    if (!['Yes', 'No', 'Not yet'].includes(answerStatus)) {
      return res.status(400).json({ message: "Invalid answerStatus." });
    }

    if (!email || !/.+@.+\..+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check for existing email
    const existingGuest = await Guest.findOne({ email });
    if (existingGuest) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    const feature = await Guest.create({
      userID,
      guestName,
      numberOfPersons,
      answerStatus,
      phone,
      address,
      email,
    });

    res.status(201).json({ message: "Guest created successfully!", feature });
  } catch (error) {
    console.error("Error in Controller:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation Error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Error creating guest", error: error.message });
    }
  }
};

// Get all guests
export const getGuests = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const guests = await Guest.find({ userID });
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single guest by ID
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { guestName, numberOfPersons, phone, address, answerStatus, email } = req.body;

    if (!['Yes', 'No', 'Not yet'].includes(answerStatus)) {
      return res.status(400).json({ message: "Invalid answerStatus." });
    }

    if (!email || !/.+@.+\..+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if another guest already uses the same email
    // const existingGuest = await Guest.findOne({ email, _id: { $ne: id } });
    // if (existingGuest) {
    //   return res.status(400).json({ message: "Email already exists. Please use a different email." });
    // }

    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { guestName, numberOfPersons, phone, address, answerStatus, email },
      { new: true }
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.status(200).json({ message: "Guest updated successfully!", updatedGuest });
  } catch (error) {
    console.error("Error in Controller:", error);
    res.status(500).json({ message: "Error updating guest", error: error.message });
  }
};

// Delete a guest
export const deleteGuest = async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};