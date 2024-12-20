import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const VenueBooking = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const { venueId } = useParams(); // Extract venueId from the URL
  const [venue, setVenue] = useState(null);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [day, setDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingConflict, setBookingConflict] = useState(false); // Track booking conflicts

  const imagesPerPage = 3; // Number of images per page

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
  const paginatedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 < Math.ceil(images.length / imagesPerPage) ? prev + 1 : prev));
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
    <div className="flex flex-col items-center pt-20 min-h-screen bg-customBg">
      <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg space-y-5">
        <h1 className="text-3xl font-bold">{venue.name}</h1>
        <p className="text-gray-700">{venue.description}</p>
        <p className="text-gray-500">Capacity: {venue.capacity}</p>
        <p className="text-gray-500">Address: ${venue.address} </p>

        <p className="text-gray-500">Price: ${venue.price} per day</p>
        <p className="text-gray-500">Price with our discount: ${venue.total} per day</p>
        <div className="my-4">
          <h2 className="text-xl font-bold">Images</h2>
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {paginatedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Venue ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={(currentPage + 1) * imagesPerPage >= images.length}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>

        <div className="my-4">
          <label className="block mb-2">
            Select Day:
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          {bookingConflict && (
            <p className="text-red-500 mt-2">This venue is already booked on the selected date.</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Venue"}
        </button>
      </div>
    </div>
  );
};

export default VenueBooking;
