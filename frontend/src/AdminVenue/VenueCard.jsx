/* eslint-disable react/prop-types */
/*import React from 'react';

const VenueCard = ({ venue }) => {
  return (
    <div className="card shadow-md p-4">
      <img src={venue.images[0]} alt={venue.name} className="h-48 w-full object-cover mb-2" />
      <h3 className="text-lg font-bold">{venue.name}</h3>
      <p className="text-sm text-gray-600">{venue.city}</p>
      <p className="text-sm">Capacity: {venue.capacity}</p>
      <p className="text-sm">Price: ${venue.price}</p>
    </div>
  );
};

export default VenueCard; */
import { useNavigate } from 'react-router-dom';

const VenueCard = ({ venue, onEdit, onDelete, isAdmin }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/venues/${venue._id}`);
  };

  return (
    <div className="card bg-white shadow-lg p-4 rounded-md hover:scale-105 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out">
      <div className="flex overflow-x-scroll space-x-2">
        {venue.images?.length > 0 ? (
          venue.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${image}`} // Make sure this path is correct
              alt={`Venue ${index + 1}`}
              className="h-48 w-48 object-cover rounded-md"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">{venue.name}</h2>
        <p className="text-sm text-gray-600">{venue.city}</p>
        <p className="text-sm text-gray-600">Capacity: {venue.capacity}</p>
        <p className="text-sm text-gray-600">Price: ${venue.price}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleViewDetails}
          className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark px-4 py-2"
        >
          View Details
        </button>
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(venue)}
              className="btn btn-primary text-white"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(venue._id)}
              className="btn btn-danger text-white"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
    
  );
  
};

export default VenueCard;
