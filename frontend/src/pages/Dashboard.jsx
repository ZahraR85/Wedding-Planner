


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Countdown from "../components/countdown";
import Music from "../components/music";
import MakeupUser from "../components/makeupUser";

const Dashboard = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        if (!isAuthenticated) {
          alert("You must sign in to access this page.");
          navigate("/signin");
          return;
        }

        const response = await axios.get(
          `http://localhost:3001/userinfoes/check/${userId}`
        );
        // Redirect only if user info does not exist
        if (response.data.exists === false) {
          console.warn("User info does not exist. Redirecting...");
          navigate("/userinfo");
        }
      } catch (err) {
        console.error("Error checking user info:", err.message);
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading regardless of the outcome
      }
    };

    checkUserInfo();
  }, [userId, isAuthenticated, navigate]);

  // Loading State
  if (isLoading) return <div>Loading...</div>;

  // Error State
  if (error) return <div>{error}</div>;

  // Render the Dashboard if everything is correct
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <Countdown />
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <Music userId={userId} />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-yellow-100 p-4 rounded shadow">
        <MakeupUser userId={userId} />
      </div>
    </div>
  );
};

export default Dashboard;















// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import Countdown from "../components/countdown";
// import Music from "../components/music";
// import MakeupUser from "../components/makeupUser";





// const Dashboard = () => {

//   const { userId, isAuthenticated } = useAppContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       alert("You must sign in to access this page.");
//       navigate("/signin");
//     }
//   }, [isAuthenticated, navigate]);


//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4">
//       <div className="w-full md:w-1/2 flex flex-col gap-4">
//         <div className="bg-blue-100 p-4 rounded shadow">
//           <Countdown />
//         </div> <div className="bg-green-100 p-4 rounded shadow">
//           <Music userId={userId} />
//         </div>
//       </div>
//       <div className="w-full md:w-1/2 bg-yellow-100 p-4 rounded shadow">
//         <MakeupUser userId={userId}/>
//       </div>
//     </div>
//   );
// };
// export default Dashboard