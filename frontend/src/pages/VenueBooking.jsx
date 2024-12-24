import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const VenueBooking = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const { venueId } = useParams(); // Extract venueId from the URL
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const [venue, setVenue] = useState(null);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [day, setDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingConflict, setBookingConflict] = useState(false); // Track booking conflicts

  // Redirect unauthenticated users to SignIn
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch venue details and images
  useEffect(() => {
    const fetchVenueDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/venues/${venueId}`);
        setVenue(response.data);
        setImages(response.data.images || []); // Assume venue data includes an images array
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    if (venueId) {
      fetchVenueDetails();
    }
  }, [venueId]);

  // Check if the venue is already booked on the selected date
  const checkBookingConflict = async (selectedDate) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/venueSelections/venue/${venueId}/date/${selectedDate}`
      );
      if (response.data.length > 0) {
        setBookingConflict(true); // Conflict found
      } else {
        setBookingConflict(false); // No conflict
      }
    } catch (error) {
      console.error("Error checking booking conflict:", error);
      setError("Failed to check booking availability.");
    }
  };

  // Check for conflicts when the day is selected
  useEffect(() => {
    if (day) {
      checkBookingConflict(day);
    }
  }, [day]);

  // Pagination for images
  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? venue.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle venue booking
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please log in to book a venue.");
      navigate("/signin"); // Redirect to login if not authenticated
      return;
    }

    if (!day) {
      alert("Booking date is required.");
      return; // Exit if no date is provided
    }

    if (bookingConflict) {
      alert("This venue is already booked on the selected date. Please choose another date.");
      return; // Exit if there's a booking conflict
    }

    try {
      // Validate the date format
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(day);
      if (!isValidDate) {
        alert("Invalid date format. Please use YYYY-MM-DD.");
        return;
      }

      setLoading(true);
      const response = await axios.post("http://localhost:3001/venueSelections", {
        userId,
        venueId,
        date: day,
      });

      alert(response.data.message || "Venue booked successfully!");
      navigate("/"); // Redirect to HomePage list after booking
    } catch (error) {
      console.error("Error during booking:", error);
      alert(error.response?.data?.message || "An error occurred while booking the venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center pt-20">Loading venue details...</div>;
  }

  if (error) {
    return <div className="text-center pt-20">{error}</div>;
  }

  if (!venue) {
    return <div className="text-center pt-20">Venue not found.</div>;
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/526gbVgR/venueformat1.png')]">
    {/* Overlay for controlling opacity */}
    <div className="absolute inset-0 bg-white/50"></div>
    <div className="relative mx-auto w-full max-w-[calc(90%-100px)] bg-customBg1 shadow-md rounded-lg p-5 space-y-4">
        <h1 className="text-3xl font-bold text-center text-BgFont">{venue.name}</h1>
        <div className="relative">
          <img
            src={venue.images[currentIndex]}
            alt={`Venue ${currentIndex}`}
            className="w-full h-auto object-cover rounded-md"
          />
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>
        <div className="flex">
          <div className="flex-1 my-4">
        <p className="text-m font-bold text-BgFont my-4">City: {venue.city}</p>
        <p className="text-m font-bold text-BgFont my-4">Capacity: 50 - {venue.capacity}</p>
        <p className="text-m font-bold text-BgFont my-4">Address: ${venue.address} </p>
        <p className="text-m font-bold text-BgFont my-4">Price: ${venue.price} </p>
        <p className="text-m font-bold text-BgFont my-4">Price with our discount: ${venue.total}</p>
        <p className="text-m font-bold text-BgFont my-4">{venue.description}</p>
        </div>
        <div className=" flex-1 my-4">
          <label className="text-m font-bold text-BgFont my-4">Select Day:
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            /></label>
          {bookingConflict && (
            <p className="text-red-500 mt-2">This venue is already booked on the selected date.</p>
          )}

        <button
          onClick={handleSubmit}
          className="w-full bg-BgPinkMiddle text-lg text-BgFont font-bold py-2 rounded hover:bg-BgPinkDark mb-2"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Venue"}
        </button>
        <button
            onClick={() => navigate("/VenueSelections")}
            className="bg-BgPinkMiddle text-lg text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4 "
          >
            Back
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VenueBooking;
