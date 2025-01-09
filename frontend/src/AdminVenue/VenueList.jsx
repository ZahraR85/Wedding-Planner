/* eslint-disable react/prop-types */
import VenueCard from './VenueCard';

const VenueList = ({ venues, onEdit, onDelete }) => {
  return (
    <div className=" min-h-screen bg-cover bg-center p-5 lg:p-10 bg-customBg1">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {venues.map((venue) => (
        <VenueCard
          key={venue._id}
          venue={venue}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
    </div>
  );
};

export default VenueList;
