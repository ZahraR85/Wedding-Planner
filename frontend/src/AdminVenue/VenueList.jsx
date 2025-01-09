import VenueCard from './VenueCard';

const VenueList = ({ venues, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {venues.map((venue) => (
        <VenueCard
          key={venue._id}
          venue={venue}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default VenueList;
