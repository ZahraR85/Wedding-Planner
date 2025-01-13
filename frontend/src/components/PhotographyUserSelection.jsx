import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelections = ({ userId }) => {
  const [userSelections, setUserSelections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        if (!userId) {
          throw new Error("User ID is missing");
        }
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/photographies/${userId}`);
        setUserSelections(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response && err.response.status === 404) {
          setError({ message: "It seems no Photography features were selected. Please feel free to choose your preferences!", isCustom: true });
        } else {
          setError({ message: err.message, isCustom: false });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserSelections();
  }, [userId]);


  // Handle errors
  if (error) {
    return <p>{error.isCustom ? error.message : `Error: ${error.message}`}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!userSelections) {
    return <p>No data available for this user.</p>;
  }

  const items = Object.entries(userSelections)
    .filter(([key, value]) => {
      // Include all items with 'number' and 'price', or the special case for 'physicalAlbum'
      return (value?.number !== undefined && value?.price !== undefined) || key === "physicalAlbum";
    })
    .map(([key, value]) => {
      if (key === "physicalAlbum") {
        return {
          name: key,
          quantity: value.selected ? 1 : 0, // Treat 'selected' as a boolean toggle
          price: value.price,
        };
      }
      return {
        name: key,
        quantity: value.number,
        price: value.price,
      };
    });
  return (
    <div className="user-selections mx-auto max-w-xl text-xl text-BgFont  space-y-4 p-4">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="text-lg">
            {item.quantity > 0 ? (
              <>
                ✔ {item.name}:{" "}
                <span className="text-sm text-BgFont ">
                  ${item.price} for {item.quantity} hour(s) Total: ${item.price * item.quantity}
                </span>
              </>
            ) : (
              <>
                ❌ {item.name}:{" "}
                <span className="text-sm text-gray-600">${item.price}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <br />
      <br />
      <p style={{ fontSize: "16px", color: "#555", fontWeight: "bold" }}>Total Cost: ${userSelections.total || 0}</p>
      <p style={{ fontSize: "0.8rem", color: "#555" }}>
        Last Updated: {userSelections.updatedAt ? new Date(userSelections.updatedAt).toLocaleString() : "No Update Info"}
      </p>
    </div>
  );
};

export default UserSelections;
