import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await axios.get(`http://localhost:3001/venues/${id}`);
        setVenue(response.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    }
    fetchVenue();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (venue?.images?.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (venue?.images?.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };
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

  if (!venue) {
    return (
      <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/526gbVgR/venueformat1.png')]">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative mx-auto w-full max-w-[calc(90%-100px)] bg-customBg1 shadow-md rounded-lg p-5 space-y-4">
          <p className="text-center text-lg text-BgFont">Loading venue details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/526gbVgR/venueformat1.png')]">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative mx-auto w-full max-w-[calc(90%-100px)] bg-customBg1 shadow-md rounded-lg space-y-4">
        <h1 className="text-3xl font-bold text-center text-BgFont">{venue.name || "Venue Name"}</h1>
        <div className="relative">
          <img
            src={`http://localhost:3001/${venue?.images?.[currentIndex] || "placeholder.jpg"}`}
            alt={`Venue ${currentIndex}`}
            className="w-full h-96 object-cover rounded-md"
            style={{ padding: 0 }}
          />
          <div className="absolute top-1/2 left-0 right-0 flex justify-between">
            <button onClick={handlePrevImage} className="bg-white p-2 rounded-full shadow-md hover:bg-BgPinkDark">
              Prev
            </button>
            <button onClick={handleNextImage} className="bg-white p-2 rounded-full shadow-md hover:bg-BgPinkDark">
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
          <div className="flex-1 my-4">
            <p className="text-m font-bold text-BgFont my-4">{venue.description || "No description available"}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-BgPinkMiddle text-lg text-BgFont font-bold rounded hover:bg-BgPinkDark py-2 px-4"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueDetail;
