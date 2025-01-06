import VenueSelection from '../models/venueSelection.js';
// Create or Update Venue Selection
export const createOrUpdateVenueSelection = async (req, res) => {
  const { userId, venueId, date } = req.body;

  if (!userId || !venueId || !date) {
    return res.status(400).json({ message: "userId, venueId, and date are required." });
  }
  try {
    // Check if the venue is already booked for the given date by another user
    const isDateOccupied = await VenueSelection.findOne({
      venueId,
      date,
      userId: { $ne: userId }, // Exclude bookings for the current user
    });

    if (isDateOccupied) {
      return res
        .status(400)
        .json({ message: "This venue is already booked on the selected date." });
    }

  // Check if an existing booking exists for the user
  const existingBooking = await VenueSelection.findOne({ userId });

  if (existingBooking) {
    // Update the existing booking
    existingBooking.venueId = venueId;
    existingBooking.date = date;
    const updatedBooking = await existingBooking.save();

    console.log("Booking updated:", updatedBooking);
    return res
      .status(200)
      .json({ message: "Booking updated successfully.", data: updatedBooking });
  }

  // Create a new booking if no existing booking is found
  const newBooking = new VenueSelection({ userId, venueId, date });
  const savedBooking = await newBooking.save();

  console.log("Booking created:", savedBooking);
  return res
    .status(201)
    .json({ message: "Booking created successfully.", data: savedBooking });
} catch (error) {
  console.error("Error processing booking:", error);
  return res.status(500).json({
    message: "An error occurred while processing the booking.",
    error: error.message,
  });
}
};

// Get Venue Selections by User ID
export const getVenueSelectionsByUserId = async (req, res) => {
  const { userId } = req.params;

  console.log("Fetching bookings for userId:", userId); // Log the userId to verify

  try {
    const bookings = await VenueSelection.find({ userId }).populate('venueId');
    console.log("Bookings retrieved:", bookings);

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Error fetching bookings", error: error.message });
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