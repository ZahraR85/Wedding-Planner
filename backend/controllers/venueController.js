import Venue from "../models/venue.js";

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
    const venues = await Venue.find(); // Fetch all venues from the database
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching venues", error });
  }
};
// Update a venue
export const updateVenue = async (req, res) => {
  try {
    const { venueId, name, city, capacity, price, discount, address, description, latitude, longitude } = req.body;

    // Find the venue by id
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Update venue fields
    venue.name = name;
    venue.city = city;
    venue.capacity = capacity;
    venue.price = price;
    venue.discount = discount;
    venue.address = address;
    venue.description = description;
    venue.latitude = latitude;
    venue.longitude = longitude;

    await venue.save();

    res.status(200).json({ message: "Venue updated successfully!", venue });
  } catch (error) {
    console.error(error);
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
