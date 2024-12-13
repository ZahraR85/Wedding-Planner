import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelections = () => {
  const [userSelections, setUserSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        const response = await axios.get('http://localhost:3001/musics');
        setUserSelections(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserSelections();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="user-selections">
      <h2 className="text-2xl font-bold mb-4">User Selections</h2>
      {userSelections.map((selection, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded shadow mb-4">
          <h3 className="text-lg font-semibold">User ID: {selection.userID}</h3>
          <p>Total Cost: ${selection.totalCost}</p>
          <h4 className="mt-2 font-semibold">Selections:</h4>
          <ul className="list-disc pl-5">
            {selection.selections.map((item, idx) => (
              <li key={idx} className="mb-2">
                <div className="p-2 bg-white rounded shadow">
                  <p>Music Option: {item.optionID.name}</p>
                  <p>Category: {item.optionID.category}</p>
                  <p>Price per Hour: ${item.optionID.pricePerHour}</p>
                  <p>Hours: {item.hours}</p>
                  <p>Total Price: ${item.totalPrice}</p>
                </div>
              </li>
            ))}
          </ul>
          <h4 className="mt-2 font-semibold">Custom Requests:</h4>
          <ul className="list-disc pl-5">
            {selection.customRequests.map((request, idx) => (
              <li key={idx}>
                {request.description} - {request.details || 'No details'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserSelections;
