import Guest from "../models/guest.js";


// Create a new guest
// export const createGuest = async (req, res) => {
//   try {
//     const guest = new Guest(req.body);
//     const savedGuest = await guest.save();
//     res.status(201).json(savedGuest);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// export const createGuest = async (req, res) => {
//   try {
//     const sampleData = {
//       userID: '6759b403fccb9095d583feea',
//       guestName: 'John Doe',
//       numberOfPersons: 3,
//       answerStatus: 'Not yet',
//       phone: '9876543210',
//       address: '123 Main Street',
//       email: 'johndoe@example.com',
//     };

//     const guest = await Guest.create(sampleData);

//     res.status(201).json({ message: 'Guest created successfully', guest });
//   } catch (error) {
//     console.error('Error in createGuest:', error); // Log detailed error
//     if (error.name === 'ValidationError') {
//       res.status(400).json({ message: 'Validation Error', errors: error.errors });
//     } else {
//       res.status(500).json({ message: 'Error creating guest', error });
//     }
//   }
// };


export const createGuest = async (req, res) => {
  try {
    console.log('Incoming Request Body:', req.body);

    const { guestName, numberOfPersons, phone, address } = req.body;

    // Hardcoded values
    const userID = "6759f0b98e91015b5c3759c3";
    const answerStatus = "Not yet";
    const email = "azadeh@gmail.com";

    const feature = await Guest.create({
      userID,
      guestName,
      numberOfPersons,
      answerStatus,
      phone,
      address,
      email,
    });

    res.status(201).json({ message: "Guest created successfully", feature });
  } catch (error) {
    console.error('Error in Controller:', error); // Log the full error object
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation Error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Error creating guest", error: error.message || error });
    }
  }
};

// Get all guests
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
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
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGuest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json(updatedGuest);
  } catch (error) {
    res.status(400).json({ error: error.message });
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