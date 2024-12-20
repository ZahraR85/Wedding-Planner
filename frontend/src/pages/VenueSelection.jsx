import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Import the AppContext

const VenueSelectionPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userId, isAuthenticated } = useAppContext(); // Access context
  const navigate = useNavigate();

  // Fetch venues data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const venueResponse = await axios.get('http://localhost:3001/venues');
        setVenues(venueResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch venue data.');
      } finally {
        setLoading(false);
      }
    };

    if (userId && isAuthenticated) {
      fetchData();
    }
  }, [userId, isAuthenticated]);

  // Handle venue selection
  const handleVenueClick = (venueId) => {
    if (!isAuthenticated) {
      alert('Please log in to book a venue.');
      navigate('/login');
      return;
    }

    navigate(`/venueBooking/${venueId}`); // Navigate to the booking page for the selected venue
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
              src={venue.images?.[0] || 'https://via.placeholder.com/150'}
              alt={venue.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{venue.name}</h3>
            <p>Capacity: {venue.capacity}</p>
            <p>Price: ${venue.price} per hour</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueSelectionPage;
