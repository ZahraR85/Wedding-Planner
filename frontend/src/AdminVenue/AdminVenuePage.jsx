import { useState, useEffect } from 'react';
import VenueForm from './VenueForm';
import VenueList from './VenueList';
import { getVenues, addVenue, updateVenue, deleteVenue } from './venue';

const AdminVenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [editVenue, setEditVenue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const VENUES_PER_PAGE = 8; // Number of venues per page

  const totalPages = Math.ceil(venues.length / VENUES_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Calculate current venues to display based on the page
  const currentVenues = venues.slice(
    (currentPage - 1) * VENUES_PER_PAGE,
    currentPage * VENUES_PER_PAGE
  );

  useEffect(() => {
    // Fetch venues when the page loads
    getVenues().then(setVenues);
  }, []);

  /*const handleAddVenue = (venueData) => {
    addVenue(venueData).then((newVenue) => {
      setVenues((prevVenues) => {
        // Check if the current page is the first page, else add it correctly
        const newVenues = [...prevVenues];
        if (currentPage === 1) {
          newVenues.unshift(newVenue); // Add at the top of the first page
        } else {
          newVenues.push(newVenue); // Add to the next page
        }
        return newVenues;
      });
      setCurrentPage(1); // Optional: Reset to the first page
    });
  };*/
  const handleAddVenue = (venueData) => {
    addVenue(venueData).then((newVenue) => {
      setVenues((prevVenues) => [newVenue, ...prevVenues]); // Immediately add to the list
      setCurrentPage(1); // Optional: Reset to the first page
    });
  };
  
  
  const handleUpdateVenue = (venueData) => {
    updateVenue(editVenue._id, venueData).then((updatedVenue) => {
      setVenues((prevVenues) =>
        prevVenues.map((venue) =>
          venue._id === updatedVenue._id ? updatedVenue : venue
        )
      );
      setEditVenue(null);
    });
  };

  const handleDeleteVenue = (venueId) => {
    deleteVenue(venueId).then(() => {
      setVenues((prevVenues) => prevVenues.filter((venue) => venue._id !== venueId));
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
        venues={currentVenues} // Pass only the current page's venues
        onEdit={setEditVenue}
        onDelete={handleDeleteVenue}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminVenuePage;
