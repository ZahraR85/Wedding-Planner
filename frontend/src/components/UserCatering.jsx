import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const UserSelections = () => {
  const { userId } = useAppContext();
  const [userSelections, setUserSelections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        if (!userId) {
          throw new Error("User ID is missing");
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/receptions?userID=${userId}`);
        console.log("API Response:", response.data); // Debug: Log API response
        setUserSelections(response.data);
      } catch (err) {
        console.error("Error fetching user selections:", err);
        if (err.response && err.response.status === 404) {
          setError({ message: "It seems no Catering features were selected. Please feel free to choose your preferences!", isCustom: true });
        } else {
          setError({ message: err.message, isCustom: true });
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

  // Transform the object keys into an array for easier mapping
  const items = Object.entries(userSelections)
    .filter(([key, value]) => value?.Number !== undefined && value?.price !== undefined)
    .map(([key, value]) => ({
      name: key,
      quantity: value.Number,
      price: value.price,
    }));

  if (items.length === 0) {
    return <p>No data available for this user.</p>;
  }

  return (
    <div className="user-selections mx-auto max-w-xl text-xl text-BgFont space-y-4 p-4">

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="text-lg">
            {item.quantity > 0 ? (
              <>
                ✔ {item.name}:{" "}
                <span className="text-sm text-gray-600">
                  ${item.price} for  {item.quantity} person Total: ${item.price * item.quantity}
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
      <br /><br />
      <p style={{ fontSize: "16px", color: "#555" , fontWeight: "bold" }}>Total Cost: ${userSelections.total || 0}</p>
      <p style={{ fontSize: "0.8rem", color: "#555"  }}>
        Last Updated: {userSelections.updatedAt ? new Date(userSelections.updatedAt).toLocaleString() : "No Update Info"}
      </p>
    </div>
  );
};

export default UserSelections;
