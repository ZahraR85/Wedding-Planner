import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const VenueSelection = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Redirect unauthenticated users to SignIn
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch venues and user's booking data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all venues
        const venueResponse = await axios.get("http://localhost:3001/venues");
        setVenues(venueResponse.data);

        // Fetch user's existing booking if available
        const bookingResponse = await axios.get(
          `http://localhost:3001/venueSelections?userId=${userId}`
        );

        if (bookingResponse.data) {
          const existingBooking = bookingResponse.data;
          setSelectedVenue(existingBooking.venueId);
          setHours(existingBooking.hours || 1);
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Handle venue selection
  const handleVenueSelect = (venueId) => {
    setSelectedVenue(venueId);
  };

  // Submit or update booking
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = "http://localhost:3001/venueSelections"; // Update with your API endpoint
      const requestData = {
        userId: userId,
        venueId: selectedVenue,
        hours: hours,
      };

      const response = isEditMode
        ? await axios.put(`${url}/${userId}`, requestData, {
            headers: { "Content-Type": "application/json" },
          })
        : await axios.post(url, requestData, {
            headers: { "Content-Type": "application/json" },
          });

      alert(response.data.message); // Show success message
      setIsEditMode(true); // Enable edit mode after successful submission
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to process booking!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold mb-5">Select and Book a Venue</h1>

        <div className="space-y-4">
          {venues.map((venue) => (
            <label
              key={venue._id}
              className={`block p-4 border rounded-lg ${
                selectedVenue === venue._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="venue"
                value={venue._id}
                checked={selectedVenue === venue._id}
                onChange={() => handleVenueSelect(venue._id)}
                className="mr-3"
              />
              {venue.name} - Capacity: {venue.capacity} - ${venue.price} per hour
            </label>
          ))}
        </div>

        <label className="flex items-center space-x-3">
          <span>Number of hours:</span>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min={1}
            className="border rounded p-2 w-20"
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading || !selectedVenue}
        >
          {loading ? "Processing..." : isEditMode ? "Update Booking" : "Book Venue"}
        </button>
      </div>
    </div>
  );
};

export default VenueSelection;
