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
      <h1 className="text-2xl font-bold my-4">Manage Venues</h1>
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

/*import { useState, useEffect } from 'react';
import VenueForm from './VenueForm';
import VenueList from './VenueList';
import axios from 'axios';

const AdminVenuePage = () => {
  const [venues, setVenues] = useState([]);

  const fetchVenues = async () => {
    try {
      const response = await axios.get('/venues'); // Fetch all venues
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const handleAddVenue = async (venueData) => {
    try {
      const response = await axios.post('/venues/add', venueData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setVenues([...venues, response.data]);
    } catch (error) {
      console.error('Error adding venue:', error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Venue Management</h1>
      <VenueForm onAddVenue={handleAddVenue} />
      <VenueList venues={venues} />
    </div>
  );
};

export default AdminVenuePage; */
