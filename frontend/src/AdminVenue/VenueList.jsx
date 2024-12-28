/* eslint-disable react/prop-types */
//import React from 'react';
import VenueCard from './VenueCard';

const VenueList = ({ venues }) => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-customBg">
      <div className="w-[98%] p-6 bg-customBg1 shadow-lg rounded-lg space-y-5 ">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {venues.map((venue) => (
        <VenueCard key={venue._id} venue={venue} />
      ))}
    </div>
    </div>
    </div>
  );
};

export default VenueList;
