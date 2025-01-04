import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast

const VenueBooking = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const { venueId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [venue, setVenue] = useState(null);
  const [images, setImages] = useState([]);
  const [day, setDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingConflict, setBookingConflict] = useState(false);
  const [alreadyBookedMessage, setAlreadyBookedMessage] = useState(""); // Message for already booked

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/venues/${venueId}`);
        setVenue(response.data);
        setImages(response.data.images || []);
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

  const checkBookingConflict = async (selectedDate) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/venueSelections/venue/${venueId}/date/${selectedDate}`
      );
      if (response.data.length > 0) {
        setBookingConflict(true);
      } else {
        setBookingConflict(false);
      }
    } catch (error) {
      console.error("Error checking booking conflict:", error);
      setError("Failed to check booking availability.");
    }
  };

  useEffect(() => {
    if (day) {
      checkBookingConflict(day);
    }
  }, [day]);

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

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please log in to book a venue.");
      navigate("/signin");
      return;
    }

    if (!day) {
      alert("Booking date is required.");
      return;
    }

    if (bookingConflict) {
      alert("This venue is already booked on the selected date. Please choose another date.");
      return;
    }

    try {
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

      // Replace the alert with toast.success for successful booking
      if (response.data.message) {
        setAlreadyBookedMessage(response.data.message);
      } else {
        toast.success("Venue booked successfully!"); // Use toast instead of alert
        navigate("/"); // Redirect to HomePage list after booking
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while booking the venue. Please try again.";

      if (errorMessage.includes("You already have a booking")) {
        setAlreadyBookedMessage("You already have a booking. You cannot book another venue.");
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/526gbVgR/venueformat1.png')]">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative mx-auto w-full max-w-[calc(90%-100px)] bg-customBg1 shadow-md rounded-lg p-5 space-y-4">
        <h1 className="text-3xl font-bold text-center text-BgFont">{venue?.name}</h1>
        <div className="relative">
          <img
            src={`http://localhost:3001/${venue?.images[currentIndex]}`}
            alt={`Venue ${currentIndex}`}
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute top-1/2 left-0 right-0 flex justify-between">
            <button onClick={handlePrevImage} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              Prev
            </button>
            <button onClick={handleNextImage} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 my-4">
            <p className="text-m font-bold text-BgFont my-4">City: {venue?.city}</p>
            <p className="text-m font-bold text-BgFont my-4">Capacity: {venue?.capacity}</p>
            <p className="text-m font-bold text-BgFont my-4">Price: {venue?.price}</p>
            <p className="text-m font-bold text-BgFont my-4">{venue?.description}</p>
          </div>
          <div className="flex-1 my-4">
            <label className="text-m font-bold text-BgFont my-4">Select Day:
              <input
                type="date"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
            </label>
            {bookingConflict && (
              <p className="text-red-500 mt-2">This venue is already booked on the selected date. Please choose another date.</p>
            )}

            {alreadyBookedMessage && (
              <p className="text-red-500 mt-2">{alreadyBookedMessage}</p> // Display message here
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-BgPinkMiddle text-lg text-BgFont font-bold py-2 rounded hover:bg-BgPinkDark mb-2"
              disabled={loading || bookingConflict}
            >
              {loading ? "Booking..." : "Book Venue"}
            </button>
            <button
              onClick={() => navigate("/VenueSelections")}
              className="bg-BgPinkMiddle text-lg text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4"
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
