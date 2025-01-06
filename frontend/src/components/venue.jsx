import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelections = ({ userId }) => {
  const [userSelections, setUserSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/venueSelections/${userId}`);
        console.log("API Response:", response.data);
        setUserSelections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
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

  if (!userSelections.length) {
    return <p>No venues selected for this user.</p>;
  }

  const formatImagePath = (path) => `http://localhost:3001/${path.replace(/\\/g, '/')}`;

  return (
    <div>
      <div className="mx-auto  max-w-[calc((6)0%-130px)] bg-opacity-80   space-y-4 p-4  ">
        <ul>
          {userSelections.map((selection) => (
           <li
           key={selection._id}
           style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             width: '100%',
             height: '100%',
           }}
         >
           <div
             style={{
               width: '380px', // Ensure the container is square
               height: '380px',
               borderRadius: '50%', // Makes the container circular
               overflow: 'hidden', // Ensures the image does not overflow the circular container
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
             }}
           >
             {selection.venueId?.images?.[0] ? (
               <img
                 src={formatImagePath(selection.venueId.images[0])}
                 alt="Venue"
                 style={{
                   width: '100%',
                   height: '100%',
                   objectFit: 'cover', // Ensures the image fills the circle
                 }}
               />
             ) : (
               <p>No images available</p>
             )}
           </div>
         </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default UserSelections;


{/* <p>Address: {selection.venueId?.address}</p> */ }
{/* <h3>{selection.venueId?.name || 'Unknown Venue'}</h3> */ }
{/* <p>City: {selection.venueId?.city}</p> */ }
{/* <p>Date: {new Date(selection.date).toLocaleDateString()}</p> */ }

{/* // Display only the first image */ }

{/* // Display all images */ }
{/* <div>
              {selection.venueId?.images?.length ? (
                selection.venueId.images.map((img, index) => (
                  <img
                    key={index}
                    src={formatImagePath(img)}
                    alt="Venue"
                    style={{ width: '200px', height: '150px', margin: '10px', borderRadius: '10px' }}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div> */}