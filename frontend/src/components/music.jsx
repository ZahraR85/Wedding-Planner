
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelections = ({ userId }) => {
  const [userSelections, setUserSelections] = useState(null); // State to store user data


  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        const x = userId;
        const response = await axios.get(`http://localhost:3001/musics?userID=${x}`);
        setUserSelections(response.data); // Update state with fetched data
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    if (userId) fetchUserSelections();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!userSelections || !userSelections.selections) {
    return <p>No data found for this user.</p>;
  }

  return (
    <div className="user-selections">

      <div className="mx-auto  max-w-[calc((6)0%-130px)] bg-opacity-80 space-y-4 p-4">
        <h2 className="text-3xl font-bold text-center mb-6">We selected these Musik features</h2>
        {/* <h3 className="text-lg font-semibold">
          User: {userSelections.userID?.name} {userSelections.userID?.family}
        </h3> */}
        <p>Total Cost: ${userSelections.totalCost}</p>
        {/* <h4 className="mt-2 font-semibold">Selections:</h4> */}
        {userSelections.selections.map((item, idx) => (
          <div key={idx} className="mb-4 p-2 bg-white rounded shadow">
          <div className="flex items-center space-x-4">
            <p className="font-medium">{item.optionID?.name || 'N/A'}</p>
            <p style={{ fontSize: "0.6rem", color: "#555" }}>
               ${item.optionID?.pricePerHour || 0} per Hour
            </p>
            <p>For {item.hours} Hours</p>
          </div>
          <p style={{ fontSize: "0.6rem", color: "#555" }}>Total: ${item.totalPrice}</p>
        </div>
      ))}
      <h4 className="mt-4 font-semibold">Custom Requests:</h4>
      {userSelections.customRequests?.map((request, idx) => (
        <div key={idx} className="mb-2">
          <p>{request.description || 'No description'}</p>
          <p style={{ fontSize: "0.8rem", color: "#555" }}>{request.details || 'No details'}</p>
        </div>
      )) || <p>No custom requests found.</p>}
    </div>
  </div>
  );
};

export default UserSelections;

