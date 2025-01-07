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

        const response = await axios.get(`http://localhost:3001/receptions?userID=${userId}`);
        console.log("API Response:", response.data); // Debug: Log API response
        setUserSelections(response.data);
      } catch (err) {
        console.error("Error fetching user selections:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSelections();
  }, [userId]);

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
    <div className="user-selections mx-auto max-w-xl bg-opacity-80 space-y-4 p-4">

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
      <p className="font-semibold">Total Cost: ${userSelections.total || 0}</p>
      <p className="mt-4 text-sm text-gray-500">
        Last Updated: {userSelections.updatedAt ? new Date(userSelections.updatedAt).toLocaleString() : "No Update Info"}
      </p>
    </div>
  );
};

export default UserSelections;
