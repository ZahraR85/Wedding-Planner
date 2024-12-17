import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVenues, updateVenue, deleteVenue } from './venue';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venues = await getVenues();
        const selectedVenue = venues.find((v) => v._id === id);
        setVenue(selectedVenue);
      } catch (error) {
        console.error('Error fetching venue:', error);
      }
    };

    fetchVenue();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const updatedVenue = await updateVenue(id, updatedData);
      setVenue(updatedVenue);
      alert('Venue updated successfully!');
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVenue(id);
      alert('Venue deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">{venue.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venue.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Venue ${index}`}
            className="w-full h-auto object-cover rounded-md"
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 my-4">{venue.description}</p>
      <p>City: {venue.city}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Price: ${venue.price} per day</p>
      <p>Discount: %{venue.discount}</p>
      <p>Address: {venue.address}</p>
      <p>Location: {venue.location.x}, {venue.location.y}</p>
      <p className="text-sm text-gray-600 my-4">{venue.description}</p>
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
          onClick={() => navigate('/')}
          className="btn btn-secondary text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default VenueDetails;
