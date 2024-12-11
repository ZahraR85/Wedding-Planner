import React from "react";

const MakeupDescriptionBox = ({ description }) => {
  return (
    <div className="mb-4 p-4 bg-gray-100 border rounded">
      {description ? (
        <p className="text-gray-700">{description}</p>
      ) : (
        <p className="text-gray-500">Hover over a feature to see the description.</p>
      )}
    </div>
  );
};

export default MakeupDescriptionBox;