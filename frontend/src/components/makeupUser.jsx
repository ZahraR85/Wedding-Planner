import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelections = () => {
  const [userSelections, setUserSelections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        const userID = "6757527a366a20b9c472ea29";
        const response = await axios.get(`http://localhost:3001/makeups?userID=${userID}`);
        console.log("API Response:", response.data); // Log API response
        setUserSelections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserSelections();
  }, []);

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle errors
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Handle case when no data is found
  if (!userSelections) {
    return <p>No data found for this user.</p>;
  }

  // Render user selections
  return (
    <div className="user-selections">
      <h2 className="text-2xl font-bold mb-4">Makeup features</h2>
      <div className="p-4 bg-gray-100 rounded shadow mb-4">
        {/* User Information */}
        <h3 className="text-lg font-semibold">
          User: {userSelections.userID?.name || "Unknown"} 
          ({userSelections.userID?.email || "No Email Available"})
        </h3>
        <p>Total Cost: ${userSelections.total || 0}</p>

        {/* Selections */}
        <h4 className="mt-2 font-semibold">Selections:</h4>
        <ul className="list-disc pl-5">
          <li>
            Makeup: {userSelections.makeup?.selected ? "Selected" : "Not Selected"} 
            (${userSelections.makeup?.price || 0})
          </li>
          <li>
            Dress: {userSelections.dress?.selected ? "Selected" : "Not Selected"} 
            (${userSelections.dress?.price || 0})
          </li>
          <li>
            Nail: {userSelections.nail?.selected ? "Selected" : "Not Selected"} 
            (${userSelections.nail?.price || 0})
          </li>
          <li>
            Hairstyle: {userSelections.hairstyle?.selected ? "Selected" : "Not Selected"} 
            (${userSelections.hairstyle?.price || 0})
          </li>
          <li>
            Shoes: {userSelections.shoes?.selected ? "Selected" : "Not Selected"} 
            (${userSelections.shoes?.price || 0})
          </li>
          <li>
            Special: {userSelections.special?.selected ? "Selected" : "Not Selected"} 
            (${userSelections.special?.price || 0})
          </li>
        </ul>

        {/* Last Updated */}
        <p className="mt-4">
          Last Updated: {userSelections.updatedAt ? new Date(userSelections.updatedAt).toLocaleString() : "No Update Info"}
        </p>
      </div>
    </div>
  );
};

export default UserSelections;
