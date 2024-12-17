import VenueSelection from '../models/venueSelection.js';

// Create a venue selection
export const createVenueSelection = async (req, res) => {
  try {
    const { venueId, hours, date } = req.body;
    const newSelection = await VenueSelection.create({ 
      venueId, 
      hours, 
      date, 
      userId: req.user._id 
    });
    res.status(201).json(newSelection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all venue selections for the logged-in user
export const getUserVenueSelections = async (req, res) => {
  try {
    const selections = await VenueSelection.find({ userId: req.user._id }).populate('venueId');
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
