/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const VenueCard = ({ venue, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/venues/${venue._id}`);
  };

  return (
    <div className="card border-4 border-BgPinkDark rounded-lg cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out">
      <div className="flex overflow-x-scroll space-x-2">
        {venue.images?.length > 0 ? (
          venue.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${image}`} // Make sure this path is correct
              alt={`Venue ${index + 1}`}
              className="h-48 w-48 object-cover rounded"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="mt-4">
      <h3 className="text-xl text-BgFont font-bold mt-2 px-4">{venue.name}</h3>
      <p className="text-sm text-BgFont lg:text-m font-semibold mt-2 px-4">Capacity: {venue.capacity}</p>
      <p className="text-sm text-BgFont lg:text-m font-semibold mt-2 px-4">Price: ${venue.price}</p>
      <p className="text-sm text-BgFont lg:text-m font-semibold my-2 px-4">City: {venue.city}</p>
      </div>
      <div className="p-4 flex justify-between">
        <button
          onClick={handleViewDetails}
          className="bg-BgPinkMiddle text-BgFont font-semibold lg:font-bold hover:bg-BgPinkDark lg:px-4 px-2 lg:py-2 py-1 rounded"
        >
          View Details
        </button>

            <button
              onClick={() => onEdit(venue)}
              className="bg-BgPinkMiddle text-BgFont font-semibold lg:font-bold hover:bg-BgPinkDark lg:px-4 px-2 lg:py-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(venue._id)}
              className="bg-BgPinkMiddle text-BgFont font-semibold lg:font-bold hover:bg-BgPinkDark lg:px-4 px-2 lg:py-2 py-1 rounded"
            >
              Delete
            </button>

      </div>
    </div>
    
  );
  
};

export default VenueCard;
