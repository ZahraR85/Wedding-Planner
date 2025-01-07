import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SearchCity from "../components/SearchCity";

const VenueSelectionPage = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userId, isAuthenticated, selectedCity, setSelectedCity } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const venueResponse = await axios.get('http://localhost:3001/venues');
        setVenues(venueResponse.data);
        setFilteredVenues(venueResponse.data); // Initialize filteredVenues
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

  const handleVenueClick = (venueId) => {
    if (!isAuthenticated) {
      alert('Please log in to book a venue.');
      navigate('/login');
      return;
    }
    navigate(`/venueBooking/${venueId}`);
  };
  // Filter venues based on the selected city
  const handleSearch = (city) => {
    if (city === "All Cities") {
      setFilteredVenues(venues);
    } else {
      setFilteredVenues(venues.filter((venue) => venue.city === city));
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-BgPink">
      {/* Overlay for controlling opacity */}
      <div className="absolute inset-0 bg-white/40"></div>
      <div className="relative mx-auto w-full max-w-[calc(100%-10px)] bg-customBg1 shadow-md rounded-lg p-5 space-y-4">
        {loading && <p>Loading venues...</p>}
        {error && <p>{error}</p>}

        {/* SearchCity Component */}
        <div className="mb-20">
          <SearchCity
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            onSearch={handleSearch}
          />
        </div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue._id}
              className="p-4 border-4 border-BgPinkDark rounded-lg cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out"
              onClick={() => handleVenueClick(venue._id)}
            >
              <img
                src={`http://localhost:3001/${venue.images?.[0]}`}
                alt={venue.name}
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback for missing images
              />
              <h3 className="text-lg text-BgFont font-bold mt-2">{venue.name}</h3>
              <p className="text-m text-BgFont font-semibold mt-2">Capacity: {venue.capacity}</p>
              <p className="text-m text-BgFont font-semibold mt-2">Price: {venue.price} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueSelectionPage;