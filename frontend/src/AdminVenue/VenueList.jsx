/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const VenueList = ({ venues, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = (venueId) => {
    navigate(`/venue/${venueId}`); // Navigating to the venue details page
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <div
          key={venue._id}
          className="border p-4 rounded shadow-lg cursor-pointer"
          onClick={() => handleViewDetails(venue._id)}
        >
          <img
            src={`http://localhost:3001/${venue.images[0]}`} // Show the first image as the preview
            alt={venue.name}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h2 className="text-lg font-bold">{venue.name}</h2>
          <p>{venue.city}</p>
          <p>Capacity: {venue.capacity}</p>
          <p>Price: ${venue.price}</p>
        </div>
      ))}
    </div>
  );
};

export default VenueList;
