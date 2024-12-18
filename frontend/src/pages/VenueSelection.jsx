import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const VenueSelection = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [userBooking, setUserBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const venueResponse = await axios.get("http://localhost:3001/venues");
        setVenues(venueResponse.data);

        const bookingResponse = await axios.get(
          `http://localhost:3001/venueSelections/${userId}`
        );

        if (bookingResponse.data) {
          setUserBooking(bookingResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch venue data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleVenueClick = (venueId) => {
    if (userBooking) {
      alert("You have already booked a venue.");
      return;
    }
    navigate(`/venueBooking/${venueId}`);
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold mb-5">Select a Venue to Book</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
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
        )}

        {userBooking && (
          <div className="mt-4 text-center text-red-500">
            <p>You have already booked {userBooking.venueId.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueSelection;
