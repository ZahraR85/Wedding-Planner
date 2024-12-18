

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Countdown from "../components/countdown";
import Music from "../components/music";
import MakeupUser from "../components/makeupUser";
import UserInformation from "../components/userinformation";

const Dashboard = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weddingDate, setWeddingDate] = useState(null); // New state for Wedding Date

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

        if (response.data.exists === false) {
          console.warn("User info does not exist. Redirecting...");
          navigate("/userinfo");
        }
      } catch (err) {
        console.error("Error checking user info:", err.message);
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserInfo();
  }, [userId, isAuthenticated, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <Countdown weddingDate={weddingDate} /> {/* Pass weddingDate */}
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
        <UserInformation userId={userId} setWeddingDate={setWeddingDate} /> {/* Pass setWeddingDate */}
         
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-yellow-100 p-4 rounded shadow">
        <MakeupUser userId={userId} />
      </div>
      <div className="w-full md:w-1/2 bg-pink-100 p-4 rounded shadow">
      <Music userId={userId} />
      </div>
    </div>
  );
};

export default Dashboard;









