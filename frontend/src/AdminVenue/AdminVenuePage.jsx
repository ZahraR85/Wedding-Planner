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

  const handleUpdateVenue = (venueId, updatedData) => {
    updateVenue(venueId, updatedData).then((updatedVenue) => {
      setVenues(venues.map((v) => (v._id === venueId ? updatedVenue : v)));
    });
  };

  const handleDeleteVenue = (venueId) => {
    deleteVenue(venueId).then(() => {
      setVenues(venues.filter((v) => v._id !== venueId));
    });
  };

  return (
    <div className="container mx-auto">
      {/*<h1 className="text-2xl font-bold my-4">Manage Venues</h1>*/}
      <VenueForm
        onSubmit={editVenue ? handleUpdateVenue : handleAddVenue}
        venue={editVenue}
        onCancel={() => setEditVenue(null)}
      />
      <VenueList
        venues={venues}
        isAdmin
        onEdit={setEditVenue}
        onDelete={handleDeleteVenue}
      />
    </div>
  );
};

export default AdminVenuePage;