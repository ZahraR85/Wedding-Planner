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
    if (venue && venue.images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? venue.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (venue && venue.images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  if (!venue) {
    return <div>Loading...</div>;
  }

  const googleMapsLink = venue.latitude && venue.longitude
  ? `http://maps.google.com/maps?z=12&t=k&q=loc:${venue.latitude}+${venue.longitude}`
  : null;

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen ">
      <div className="max-w-5xl w-4/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold my-4">{venue.name}</h1>
        <div className="relative">
        <img
          src={`http://localhost:3001/${venue.images[currentIndex]}`} // Ensure full URL for images
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
        <div className="flex-1">
        <p className="text-lg font-bold text-BgFont my-4">City: {venue.city}</p>
        <p className="text-lg font-bold text-BgFont my-4">Capacity: {venue.capacity}</p>
        <p className="text-lg font-bold text-BgFont my-4">Price: ${venue.price} per day</p>
        <p className="text-lg font-bold text-BgFont my-4">Discount: %{venue.discount}</p>
        <p className="text-lg font-bold text-BgFont my-4">Total Price: ${venue.total}</p>
        <p className="text-lg font-bold text-BgFont my-4">Address: {venue.address}</p>
        </div>
        <div className="flex-1">
        <p className="text-m text-BgFont my-4">Description:{venue.description}</p>
        <p className="text-lg text-BgFont my-4">Location: {venue.latitude}, {venue.longitude}</p>
        <a
          className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4 rounded mt-4 inline-block"
          target="_blank"
          rel="noopener noreferrer"
          href={googleMapsLink}
        >
          See it on Google Maps
        </a>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => handleUpdate({ ...venue, price: venue.price + 10 })}
            className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4"
          >
            Update Price
          </button>
          <button
            onClick={handleDelete}
            className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4"
          >
            Delete Venue
          </button>
          <button
            onClick={() => navigate("/Venues")}
            className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4"
          >
            Back
          </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
