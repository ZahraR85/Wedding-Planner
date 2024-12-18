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
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);

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
      try {
        const response = await axios.get(`http://localhost:3001/venues/${venueId}`);
        setVenue(response.data);
        setImages(response.data.images || []); // Assume venue data includes an images array
      } catch (error) {
        console.error("Error fetching venue details:", error);
      }
    };

    if (venueId) {
      fetchVenueDetails();
    }
  }, [venueId]);

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

  // Submit booking
  const handleSubmit = async () => {
    if (!day || hours < 1) {
      alert("Please fill in both the day and hours.");
      return;
    }

    setLoading(true);
    try {
      const url = "http://localhost:3001/bookings";
      const requestData = {
        userId,
        venueId,
        day,
        hours,
      };

      const response = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message || "Venue booked successfully!");
      navigate("/venues"); // Redirect to venues list after booking
    } catch (error) {
      console.error("Error booking venue:", error);
      alert("Failed to book venue!");
    } finally {
      setLoading(false);
    }
  };

  if (!venue) {
    return <div className="text-center pt-20">Loading venue details...</div>;
  }

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-customBg">
      <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg space-y-5">
        <h1 className="text-3xl font-bold">{venue.name}</h1>
        <p className="text-gray-700">{venue.description}</p>
        <p className="text-gray-500">Capacity: {venue.capacity}</p>
        <p className="text-gray-500">Price: ${venue.price} per hour</p>

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
          <label className="block mb-2">
            Number of Hours:
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              min={1}
              className="w-full p-2 border rounded"
            />
          </label>
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
