import { useState, useEffect } from 'react';
//import axios from 'axios';
import VenueCard from '../AdminVenue/VenueCard';
import { getVenues, bookVenue } from '../AdminVenue/venue';

const VenueSelection = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookingData, setBookingData] = useState({ hours: '', date: '' });

  useEffect(() => {
    getVenues().then(setVenues);
  }, []);

  const handleBooking = () => {
    if (selectedVenue) {
      bookVenue(selectedVenue._id, bookingData).then((res) => {
        alert('Venue booked successfully!');
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Available Venues</h1>
      <div className="grid grid-cols-3 gap-4">
        {venues.map((venue) => (
          <VenueCard
            key={venue._id}
            venue={venue}
            isAdmin={false}
            onViewDetails={setSelectedVenue}
          />
        ))}
      </div>
      {selectedVenue && (
        <div>
          <h2 className="text-xl font-bold">Book Venue: {selectedVenue.name}</h2>
          <input
            type="number"
            value={bookingData.hours}
            onChange={(e) =>
              setBookingData({ ...bookingData, hours: e.target.value })
            }
            placeholder="Hours"
            className="input"
          />
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) =>
              setBookingData({ ...bookingData, date: e.target.value })
            }
            className="input"
          />
          <button onClick={handleBooking} className="btn btn-primary">
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueSelection;

/* import { useState, useEffect } from 'react';
import VenueCard from './VenueCard';
import axios from 'axios';

const VenueSelection = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('/api/venues');
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Venue</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenueSelection; */
