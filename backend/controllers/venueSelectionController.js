import VenueSelection from '../models/venueSelection.js';

// Create Venue Selection
export const createVenueSelection = async (req, res) => {
  const { userId, venueId, date } = req.body;
  try {
    // Check if the user already has any existing booking
    const existingUserBooking = await VenueSelection.findOne({ userId });
    if (existingUserBooking) {
      return res.status(400).json({
        message: "You already have a booking. You cannot book another venue.",
      });
    }
    // Check if the venue is already booked for the given date by another user
    const isDateOccupied = await VenueSelection.findOne({
      venueId,
      date,
      userId: { $ne: userId }, // Ensure no other user has booked it for the same date
    });
    if (isDateOccupied) {
      return res
        .status(400)
        .json({ message: "This venue is already booked on the selected date." });
    }
    // Create a new booking if all checks pass
    const newBooking = new VenueSelection({ userId, venueId, date });
    await newBooking.save();
    return res
      .status(201)
      .json({ message: "Booking created successfully", data: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing booking", error: error.message });
  }
};


// Update Venue for a User
export const updateVenueSelectionByNewVenueId =  async (req, res) => {
  const { userId, date, newVenueId } = req.body;

  if (!userId || !date || !newVenueId) {
    return res.status(400).json({ message: 'userId, date, and newVenueId are required.' });
  }

  try {
    // Find and delete the existing venue for the user on the specific date
    const existingVenue = await Venue.findOneAndDelete({ userId, date });

    if (existingVenue) {
      console.log(`Deleted previous venue for userId: ${userId} on date: ${date}`);
    }

    // Create a new venue entry for the user
    const updatedVenue = new Venue({
      userId,
      date,
      venueId: newVenueId,
    });

    await updatedVenue.save();

    res.status(200).json({ message: 'Venue updated successfully.', updatedVenue });
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({ message: 'An error occurred while updating the venue.', error });
  }
};

// Get Venue Selections by User ID
export const getVenueSelectionsByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching bookings for userId:", userId); // Log the userId to verify
  try {
    const bookings = await VenueSelection.find({ userId }).populate('venueId');
    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Delete Venue Selection
export const deleteVenueSelection = async (req, res) => {
  const { userId, venueId } = req.params;

  try {
    const deletedBooking = await VenueSelection.findOneAndDelete({
      userId,
      venueId,
    });
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res
      .status(200)
      .json({ message: 'Booking deleted successfully', data: deletedBooking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error deleting booking', error: error.message });
  }
};
// Controller function to check booking conflicts
export const checkBookingConflict = async (req, res) => {
  const { venueId, date } = req.params;

  try {
    const bookings = await VenueSelection.find({ venueId, date });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error checking bookings:', error);
    res.status(500).json({ message: 'Error checking bookings' });
  }
};

// Create or Update a Venue Selection
/*export const createOrUpdateVenueSelection = async (req, res) => {
  const { userId, venueId, date } = req.body; 

  try {
    // Check if the venue is already booked for the given date by another user
    const isDateOccupied = await VenueSelection.findOne({
      venueId,
      date,
      userId: { $ne: userId }, // Exclude the same user's existing bookings
    });

    if (isDateOccupied) {
      return res
        .status(400)
        .json({ message: 'This venue is already booked on the selected date.' });
    }

    // Check if the user already has a booking for this venue
    const existingBooking = await VenueSelection.findOne({ userId, venueId });

    // If the user already has a booking for this venue, update it
    if (existingBooking) {
      existingBooking.date = date; // Update the date
      const updatedBooking = await existingBooking.save();
      return res
        .status(200)
        .json({ message: 'Booking updated successfully', data: updatedBooking });
    }

    // If no booking exists, create a new one
    const newBooking = new VenueSelection({ userId, venueId, date });
    await newBooking.save();
    res
      .status(201)
      .json({ message: 'Booking created successfully', data: newBooking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error processing booking', error: error.message });
  }
};
*/