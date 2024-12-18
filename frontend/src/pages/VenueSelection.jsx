import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Import the AppContext

const VenueSelectionPage = () => {
  const [venues, setVenues] = useState([]);
  const [userBooking, setUserBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userId, isAuthenticated } = useAppContext(); // Access context
  const navigate = useNavigate();

  // Fetch venues and user bookings
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch venues data
        const venueResponse = await axios.get('http://localhost:3001/venues');
        console.log("Fetched venues:", venueResponse.data); // Check data in console
        setVenues(venueResponse.data);

        // Fetch user booking data
        if (userId) {
          const bookingResponse = await axios.get(
            `http://localhost:3001/venueSelections/${userId}`
          );
          setUserBooking(bookingResponse.data[0]); // Assuming one booking per user
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch venue data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && isAuthenticated) {
      fetchData();
    }
  }, [userId, isAuthenticated]); // Rerun effect when userId or isAuthenticated changes

  // Handle booking or updating booking
  const handleVenueClick = async (venueId) => {
    if (!isAuthenticated) {
      alert("Please log in to book a venue.");
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const date = prompt("Enter the booking date (YYYY-MM-DD):");

    if (!date) return; // If no date is provided, return

    try {
      // Check if the user is trying to book or update a venue
      const response = await axios.post('http://localhost:3001/venueSelections', {
        userId,
        venueId,
        date,
      });

      alert(response.data.message);
      // Refresh the bookings after success
      const bookingResponse = await axios.get(
        `http://localhost:3001/venueSelections/${userId}`
      );
      setUserBooking(bookingResponse.data[0]); // Update booking info
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      {loading && <p>Loading venues...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue._id}
            className="p-4 border rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => handleVenueClick(venue._id)}
          >
            <img
              src={venue.images?.[0] || "https://via.placeholder.com/150"}
              alt={venue.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{venue.name}</h3>
            <p>Capacity: {venue.capacity}</p>
            <p>Price: ${venue.price} per hour</p>
          </div>
        ))}
      </div>

      {userBooking && (
        <div>
          <h2>Your Booking</h2>
          <p>Venue: {userBooking.venueId.name}</p>
          <p>Date: {userBooking.date}</p>
        </div>
      )}
    </div>
  );
};

export default VenueSelectionPage;
