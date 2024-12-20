import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenues, updateVenue, deleteVenue } from "./venue";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venues = await getVenues();
        const selectedVenue = venues.find((v) => v._id === id);
        setVenue(selectedVenue);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const updatedVenue = await updateVenue(id, updatedData);
      setVenue(updatedVenue);
      alert("Venue updated successfully!");
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVenue(id);
      alert("Venue deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

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

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="w-5/6 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold my-4">{venue.name}</h1>
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
        <p className="text-sm text-gray-600 my-4">{venue.description}</p>
        <p>City: {venue.city}</p>
        <p>Capacity: {venue.capacity}</p>
        <p>Price: ${venue.price} per day</p>
        <p>Discount: %{venue.discount}</p>
        <p>Address: {venue.address}</p>
        <p>Location: {venue.location.x}, {venue.location.y}</p>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => handleUpdate({ ...venue, price: venue.price + 10 })}
            className="btn btn-primary text-white"
          >
            Update Price
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger text-white"
          >
            Delete Venue
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary text-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
