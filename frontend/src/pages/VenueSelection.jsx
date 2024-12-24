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
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/MH1TyvzF/venueformat.png')]">
    {/* Overlay for controlling opacity */}
    <div className="absolute inset-0 bg-white/50"></div>
    <div className="relative mx-auto w-full max-w-[calc(95%-100px)] bg-opacity-90 shadow-md rounded-lg p-5 space-y-4">
      {loading && <p>Loading venues...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {venues.map((venue) => (
          <div
            key={venue._id}
            className="p-4 border rounded-lg cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out"
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
    </div>
  );
};

export default VenueSelectionPage;
