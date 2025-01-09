import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/venues';

export const getVenues = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addVenue = async (venueData) => {
  const response = await axios.post(API_BASE_URL, venueData);
  return response.data;
};

export const updateVenue = async (venueId, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/${venueId}`, updatedData);
  return response.data;
};

export const deleteVenue = async (venueId) => {
  await axios.delete(`${API_BASE_URL}/${venueId}`);
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