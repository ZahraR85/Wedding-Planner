import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/venues'; // Replace with your actual backend base URL

// Fetch all venues
export const getVenues = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    console.log('Fetched venues:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

// Add a new venue
export const addVenue = async (venueData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, venueData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding venue:', error);
    throw error;
  }
};

// Update a venue
export const updateVenue = async (venueId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${venueId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add auth token if required
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating venue:', error);
    throw error;
  }
};

// Delete a venue
export const deleteVenue = async (venueId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${venueId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add auth token if required
      },
    });
  } catch (error) {
    console.error('Error deleting venue:', error);
    throw error;
  }
};

// Book a venue (used in the UserVenuePage)
export const bookVenue = async (venueId, bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${venueId}/book`, bookingData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add auth token if required
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error booking venue:', error);
    throw error;
  }
};
