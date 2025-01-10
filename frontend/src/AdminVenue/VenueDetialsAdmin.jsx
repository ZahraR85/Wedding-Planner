import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenues, updateVenue, deleteVenue } from "./venue";

const VenueDetailsAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venues = await getVenues();
        const selectedVenue = venues.find((v) => v._id === id);
        setVenue(selectedVenue);
        setPrice(selectedVenue.price);
        setDiscount(selectedVenue.discount);
        setTotal(
          selectedVenue.price - (selectedVenue.price * selectedVenue.discount) / 100
        );
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [id]);

  useEffect(() => {
    if (venue?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [venue]);

  const handleUpdate = async () => {
    try {
      const updatedData = {
        price,
        discount,
        total: price - (price * discount) / 100,
      };
      const updatedVenue = await updateVenue(id, updatedData);
      setVenue(updatedVenue);
      setTotal(updatedVenue.total);
      alert("Venue updated successfully!");
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Failed to update venue.");
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

  const totalPrice = price - (price * discount) / 100;

  const googleMapsLink =
    venue.latitude && venue.longitude
      ? `http://maps.google.com/maps?z=12&t=k&q=loc:${venue.latitude}+${venue.longitude}`
      : null;

  return (
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/526gbVgR/venueformat1.png')]">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative mx-auto w-full max-w-[calc(90%-100px)] bg-customBg1 shadow-md rounded-lg p-5 space-y-4">
        <h1 className="text-3xl font-bold text-center text-BgFont my-4">{venue.name}</h1>
        <div className="relative">
          <div className="overflow-hidden">
            <img
              src={`http://localhost:3001/${venue.images[currentIndex]}`}
              alt={`Venue ${currentIndex}`}
              className="w-full h-auto object-cover rounded-md"
              style={{ padding: 0 }}
            />
          </div>
          <div className="absolute top-1/2 left-0 right-0 flex justify-between">
            <button
              onClick={handlePrevImage}
              className="bg-white p-2 rounded-full shadow-md hover:bg-BgPinkDark"
            >
              Prev
            </button>
            <button
              onClick={handleNextImage}
              className="bg-white p-2 rounded-full shadow-md hover:bg-BgPinkDark"
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 m-4">
            <p className="text-m font-bold text-BgFont my-4">City: {venue.city || "N/A"}</p>
            <p className="text-m font-bold text-BgFont my-4">Capacity: {venue.capacity || "N/A"}</p>
            <p className="text-m font-bold text-BgFont my-4">Price: {venue.price ? `${venue.price} €` : "N/A"}</p>
            <p className="text-m font-bold text-BgFont my-4">Discount: {venue.discount ? `${venue.discount} %` : "N/A"}</p>
            <p className="text-m font-bold text-BgFont my-4">Total price: {venue.total ? `${venue.total} €` : "N/A"}</p>
            <p className="text-m font-bold text-BgFont my-4">Address: {venue.address || "N/A"}</p>
          </div>

          <div className="flex-1">
            <p className="text-m font-semibold text-BgFont my-4">Description: {venue.description}</p>
            <p className="text-lg font-bold text-BgFont my-4">Location: {venue.latitude}, {venue.longitude}</p>
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
                onClick={handleUpdate}
                className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4"
              >
                Save Changes
              </button>
              <button
                onClick={handleDelete}
                className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark py-2 px-4"
              >
                Delete Venue
              </button>
              <button
                onClick={() => navigate("/Admin/Venue")}
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

export default VenueDetailsAdmin;
