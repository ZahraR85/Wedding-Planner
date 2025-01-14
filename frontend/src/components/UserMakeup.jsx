import { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelections = ({ userId }) => {
  const [userSelections, setUserSelections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        const x = userId;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/makeups?userID=${x}`);
        
        setUserSelections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response && err.response.status === 404) {
          setError({ message: "It seems no Makeup features were selected. Please feel free to choose your preferences!", isCustom: true });
        } else {
          setError({ message: err.message, isCustom: false });
        }
        setLoading(false);
      }
    };

    if (userId) fetchUserSelections();
  }, [userId]);

 
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
    return <p>No data found for this user.</p>;
  }

  // Render user selections
  return (
    <div className="user-selections">

      <div className="mx-auto  max-w-[calc((6)0%-130px)] text-xl text-BgFont bg-opacity-80   space-y-4 p-4  ">
        <ul className="pl-5 space-y-2">
          <li>
            {userSelections.makeup?.selected ? "✔️" : "❌"}
            Makeup    <span style={{ fontSize: "0.8rem", color: "#555" }}> (${userSelections.makeup?.price || 0})</span>
          </li>
          <li>
            {userSelections.dress?.selected ? "✔️" : "❌"}
            Dress   <span style={{ fontSize: "0.8rem", color: "#555" }}> (${userSelections.dress?.price || 0})</span>
          </li>
          <li>
            {userSelections.nail?.selected ? "✔️" : "❌"}
            Nail  <span style={{ fontSize: "0.8rem", color: "#555" }}> (${userSelections.nail?.price || 0})</span>
          </li>
          <li>
            {userSelections.hairstyle?.selected ? "✔️" : "❌"}
            Hairstyle  <span style={{ fontSize: "0.8rem", color: "#555" }}> (${userSelections.hairstyle?.price || 0})</span>
          </li>
          <li>
            {userSelections.shoes?.selected ? "✔️" : "❌"}
            Shoes   <span style={{ fontSize: "0.8rem", color: "#555" }}> (${userSelections.shoes?.price || 0})</span>
          </li>
          <li>
            {userSelections.special?.selected ? "✔️" : "❌"}
            Special  <span style={{ fontSize: "0.8rem", color: "#555" }}> (${userSelections.special?.price || 0})</span>
          </li>
        </ul>
        <br />
        <br />

        <p style={{ fontSize: "16px", color: "#555" , fontWeight: "bold" }}>Total Cost: ${userSelections.total || 0}</p>
        <p style={{ fontSize: "0.8rem", color: "#555" }} className="mt-4">
          Last Updated: {userSelections.updatedAt ? new Date(userSelections.updatedAt).toLocaleString() : "No Update Info"}
        </p>
      </div>
    </div>
  );
};

export default UserSelections;
