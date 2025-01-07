import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function Venue() {
  const { selectedCity } = useAppContext();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();


  useEffect(() => {
    console.log("Fetching venues for:", selectedCity);
    async function fetchVenues() {
      const url =
        selectedCity === "All Cities"
          ? "http://localhost:3001/venues"
          : `http://localhost:3001/venues?city=${selectedCity}`;
      try {
        const response = await axios.get(url);
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }
    fetchVenues();
  }, [selectedCity]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = venues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(venues.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="relative min-h-screen bg-cover bg-center p-20">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative mx-auto w-full max-w-[calc(98%-50px)] bg-opacity-90 shadow-md rounded-lg p-5 space-y-4">
        {loading && <p>Loading venues...</p>}
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue._id}
              className="p-4 border-4 border-BgPinkDark rounded-lg cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out"
              onClick={() => navigate(`/venues/${venue._id}`)}
            >
              <img
                src={`http://localhost:3001/${venue.images?.[0]}`}
                alt={venue.name}
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <h3 className="text-lg font-bold mt-2">{venue.name}</h3>
              <p className="text-m font-semibold mt-2">Capacity: {venue.capacity}</p>
              <p className="text-m font-semibold mt-2">Price: ${venue.price}</p>
              <p className="text-m font-semibold mt-2">City: {venue.city}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-BgPinkDark text-white"}`}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`p-2 rounded-md ${
                currentPage === index + 1 ? "bg-BgPinkDark text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages ? "bg-gray-300" : "bg-BgPinkDark text-white"}`}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default Venue;
