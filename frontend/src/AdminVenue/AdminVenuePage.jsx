import { useState, useEffect } from 'react';
import VenueForm from './VenueForm';
import VenueList from './VenueList';
import { getVenues, addVenue, updateVenue, deleteVenue } from './venue';

const AdminVenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [editVenue, setEditVenue] = useState(null);

  useEffect(() => {
    // Fetch venues when the page loads
    getVenues().then(setVenues);
  }, []);

  const handleAddVenue = (venueData) => {
    addVenue(venueData).then((newVenue) => {
      setVenues((prevVenues) => [...prevVenues, newVenue]); // Add new venue to the list
    });
  };

  const handleUpdateVenue = (venueData) => {
    updateVenue(editVenue._id, venueData).then((updatedVenue) => {
      setVenues((prevVenues) =>
        prevVenues.map((venue) =>
          venue._id === updatedVenue._id ? updatedVenue : venue
        )
      ); // Update the specific venue
      setEditVenue(null); // Reset form to Add mode
    });
  };

  const handleDeleteVenue = (venueId) => {
    deleteVenue(venueId).then(() => {
      setVenues((prevVenues) => prevVenues.filter((venue) => venue._id !== venueId)); // Remove the deleted venue
    });
  };

  return (
    <div className="container mx-auto">
      <VenueForm
        onSubmit={editVenue ? handleUpdateVenue : handleAddVenue}
        venue={editVenue}
        onCancel={() => setEditVenue(null)}
      />
      <VenueList
        venues={venues}
        onEdit={setEditVenue}
        onDelete={handleDeleteVenue}
      />
    </div>
  );
};

export default AdminVenuePage;
