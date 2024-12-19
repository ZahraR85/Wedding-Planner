
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
      <h2 className="text-2xl font-bold mb-4">Music features</h2>
      <div className="p-4 bg-gray-100 rounded shadow mb-4">
        {/* <h3 className="text-lg font-semibold">
          User: {userSelections.userID?.name} {userSelections.userID?.family}
        </h3> */}
        <p>Total Cost: ${userSelections.totalCost}</p>
        {/* <h4 className="mt-2 font-semibold">Selections:</h4> */}
        <ul className="list-disc pl-5">
          {userSelections.selections.map((item, idx) => (
            <li key={idx} className="mb-2">
              <div className="p-2 bg-white rounded shadow">
                <p>{item.optionID?.name || 'N/A'} Price per Hour: ${item.optionID?.pricePerHour || 0} for {item.hours} Hours</p>
                <p>Total Price: ${item.totalPrice}</p>
              </div>
            </li>
          ))}
        </ul>
        <h4 className="mt-2 font-semibold">Custom Requests:</h4>
        <ul className="list-disc pl-5">
          {userSelections.customRequests?.map((request, idx) => (
            <li key={idx}>
              {request.description || 'No description'} - {request.details || 'No details'}
            </li>
          )) || <p>No custom requests found.</p>}
        </ul>
      </div>
    </div>
  );
};

export default UserSelections;

