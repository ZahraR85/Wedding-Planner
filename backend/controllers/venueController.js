import Venue from "../models/venue.js";




// Get unique cities
export const getUniqueCities = async (req, res) => {
  try {
    const cities = await Venue.distinct("city"); // Fetch distinct cities
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Error fetching cities", error });
  }
};


export const createVenue = async (req, res) => {
  try {
    const { userId, name, city, capacity, price, discount, address, description, latitude, longitude } = req.body;

    // Collect uploaded image URLs
    const images = req.files.map((file) => file.path);

    const venue = new Venue({
      userId,
      name,
      city,
      capacity,
      price,
      discount,
      address,
      description,
      latitude,
      longitude,
      images,
    });

    await venue.save();
    res.status(201).json({ message: "Venue created successfully!", venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating venue", error });
  }
};
// Get all venues
export const getAllVenues = async (req, res) => {
  try {
    const { city } = req.query; // Extract city from query parameters
    const filter = city && city !== "All Cities" ? { city } : {}; // Build the filter object

    const venues = await Venue.find(filter); // Apply filter when fetching venues
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Error fetching venues", error });
  }
};
// Update a price of venue
export const updateVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const updatedVenue = await Venue.findByIdAndUpdate(venueId, req.body, { new: true });
    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error });
  }
};

// Delete a venue
export const deleteVenue = async (req, res) => {
  try {
    const { venueId } = req.params;

    // Find and delete the venue
    const venue = await Venue.findByIdAndDelete(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting venue", error });
  }
};

// Get a specific venue by venue ID
export const getVenueByVenueId = async (req, res) => {
  try {
    const { venueId } = req.params;

    const venue = await Venue.findById(venueId);

    if (!venue) return res.status(404).json({ message: "Venue not found." });

    res.status(200).json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ message: "Failed to fetch venue.", error });
  }
};

// Get venues by user ID
export const getVenuesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const venues = await Venue.find({ userId });

    if (!venues.length) return res.status(404).json({ message: "No venues found for this user." });

    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues by user:", error);
    res.status(500).json({ message: "Failed to fetch venues.", error });
  }
};
