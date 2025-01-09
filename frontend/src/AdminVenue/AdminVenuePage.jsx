import { useState, useEffect } from 'react';
import VenueForm from './VenueForm';
import VenueList from './VenueList';
import { getVenues, addVenue, updateVenue, deleteVenue } from './venue';

const AdminVenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [editVenue, setEditVenue] = useState(null);

  useEffect(() => {
    getVenues().then(setVenues);
  }, []);

  const handleAddVenue = (venueData) => {
    addVenue(venueData).then((newVenue) => {
      setVenues([...venues, newVenue]);
    });
  };

  const handleUpdateVenue = (venueData) => {
    updateVenue(editVenue._id, venueData).then((updatedVenue) => {
      setVenues(venues.map((v) => (v._id === editVenue._id ? updatedVenue : v)));
      setEditVenue(null); // Reset form to Add mode
    });
  };

  const handleDeleteVenue = (venueId) => {
    deleteVenue(venueId).then(() => {
      setVenues(venues.filter((v) => v._id !== venueId));
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
