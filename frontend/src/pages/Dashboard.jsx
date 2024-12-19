



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Countdown from "../components/countdown";
import Music from "../components/music";
import MakeupUser from "../components/makeupUser";
import UserInformation from "../components/userinformation";


import userinfoBackground from '../images/userinfo.png';
import musicBackground from '../images/music1.png';
import makeupBackground from '../images/makeup.png';



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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        {/* Countdown */}
        <div className="p-4 rounded shadow bg-blue-100">
          <Countdown weddingDate={weddingDate} />
        </div>



        {/* User Information with Background */}
        <div
          className="flex justify-center items-center p-4 rounded shadow h-[300px] md:h-[400px]"
          style={{
            backgroundImage: `url(${userinfoBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          
            <UserInformation userId={userId} setWeddingDate={setWeddingDate} />
        
        </div>

        <div className="flex justify-center items-center p-4 rounded shadow h-[300px] md:h-[400px]"
          style={{
            backgroundImage: `url(${makeupBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          {/* Makeup Features */}

          <MakeupUser userId={userId} />

        </div>

        <div className="flex justify-center items-center p-4 rounded shadow h-[300px] md:h-[400px]"
          style={{
            backgroundImage: `url(${userinfoBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          {/* Makeup Features */}

          <MakeupUser userId={userId} />

        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4">


        {/* Music Features */}
        <div className="flex justify-center items-center p-4 rounded shadow w-full"
  style={{
    backgroundImage: `url(${musicBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "400px", // Fixed height to prevent overflow
    maxWidth: "100%", // Ensure no horizontal overflow
    margin: "0 auto", // Center the div horizontally
    overflow: "hidden", // Hide overflow content
  }}>
      <div className="p-4 bg-white bg-opacity-90 rounded shadow w-full md:w-2/3 lg:w-1/2">
    <Music userId={userId} />
  </div>

        </div>
      </div>
    </div>
  );


};

export default Dashboard;

















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import Countdown from "../components/countdown";
// import Music from "../components/music";
// import MakeupUser from "../components/makeupUser";
// import UserInformation from "../components/userinformation";

// import userinfoBackground from '../images/userinfo.png';
// import musicBackground from '../images/music.png';


// const Dashboard = () => {
//   const { userId, isAuthenticated } = useAppContext();
//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [weddingDate, setWeddingDate] = useState(null); // New state for Wedding Date

//   useEffect(() => {
//     const checkUserInfo = async () => {
//       try {
//         if (!isAuthenticated) {
//           alert("You must sign in to access this page.");
//           navigate("/signin");
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:3001/userinfoes/check/${userId}`
//         );

//         if (response.data.exists === false) {
//           console.warn("User info does not exist. Redirecting...");
//           navigate("/userinfo");
//         }
//       } catch (err) {
//         console.error("Error checking user info:", err.message);
//         setError("Something went wrong. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkUserInfo();
//   }, [userId, isAuthenticated, navigate]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4">
//       <div className="w-full md:w-1/2 flex flex-col gap-4">


//         <div className="bg-blue-100 p-4 rounded shadow">
//           <Countdown weddingDate={weddingDate} /> {/* Pass weddingDate */}
//         </div>
//         <div className="bg-green-100 p-4 rounded shadow">
//           <UserInformation userId={userId} setWeddingDate={setWeddingDate} /> {/* Pass setWeddingDate */}
//         </div>
//         {/* <div className="p-4 rounded shadow" style={{ backgroundImage: `url(${userinfoBackground})`, backgroundSize: 'cover' }}>
//           <UserInformation userId={userId} setWeddingDate={setWeddingDate} />
//         </div> */}
//         <div
//           className="flex justify-center items-center h-screen w-full"
//           style={{
//             backgroundImage: `url(${userinfoBackground})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="p-4 rounded shadow bg-white bg-opacity-90">
//             <UserInformation userId={userId} setWeddingDate={setWeddingDate} />
//           </div>
//         </div>

//       </div>


//       <div className="w-full md:w-1/2 bg-yellow-100 p-4 rounded shadow">
//         <MakeupUser userId={userId} />
//       </div>

//       <div className="w-full md:w-1/2 bg-pink-100 p-4 rounded shadow">
//         <Music userId={userId} />
//       </div>




//     </div>
//   );
// };

// export default Dashboard;









