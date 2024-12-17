/* eslint-disable react/prop-types */
//import React from 'react';
import VenueCard from './VenueCard';

const VenueList = ({ venues }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {venues.map((venue) => (
        <VenueCard key={venue._id} venue={venue} />
      ))}
    </div>
  );
};

export default VenueList;
