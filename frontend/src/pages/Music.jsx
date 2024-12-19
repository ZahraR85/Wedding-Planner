
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext"; // Assuming you have AppContext for user data
import { useNavigate } from "react-router-dom";

const MusicSelectionForm = () => {
  const { userId, isAuthenticated } = useAppContext(); // Get userId and auth status from context
  const navigate = useNavigate(); // Navigation hook

  const [musicOptions, setMusicOptions] = useState([]);
  const [userSelection, setUserSelection] = useState(null); // Store user data from the database
  const [hours, setHours] = useState({}); // Track hours for each music option
  const [customRequest, setCustomRequest] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const [loading, setLoading] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please sign in to continue.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch music options and user data on load
  useEffect(() => {
    if (!userId) return;
  
    const fetchData = async () => {
      try {

         // Fetch music options
    const optionsResponse = await axios.get("http://localhost:3001/musicoptions");
    console.log("Fetched Music Options:", optionsResponse.data);
    setMusicOptions(optionsResponse.data);

        const userResponse = await axios.get(`http://localhost:3001/musics?userID=${userId}`);
        console.log("Fetched User Data:", userResponse.data); // Debugging
  
        if (userResponse.data) {
          // Map fetched selections to hours for pre-filling
          const mappedHours = userResponse.data.selections.reduce((acc, selection) => {
            acc[selection.optionID._id] = selection.hours; // Use optionID._id as the key
            return acc;
          }, {});
  
          // Map selections to hours state
          setHours(mappedHours); // Pre-fill hours
        setUserSelection(userResponse.data); // Store user data
  
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
  }, [userId]);

  // Calculate total cost dynamically
  useEffect(() => {
    if (musicOptions.length > 0) {
      const totalCost = musicOptions.reduce((total, option) => {
        const selectedHours = parseInt(hours[option._id] || 0, 10);
        return total + selectedHours * option.pricePerHour;
      }, 0);

      setUserSelection((prev) => ({
        ...prev,
        totalCost,
      }));
    }
  }, [hours, musicOptions]);

  const handleHoursChange = (optionID, value) => {
    setHours((prev) => ({
      ...prev,
      [optionID]: value,
    }));
  };

  const addCustomRequest = () => {
    if (customRequest.trim()) {
      setUserSelection((prev) => ({
        ...prev,
        customRequests: [...(prev?.customRequests || []), { description: customRequest }],
      }));
      setCustomRequest("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selections = musicOptions
        .filter((option) => hours[option._id] > 0)
        .map((option) => ({
          optionID: option._id,
          hours: parseInt(hours[option._id], 10),
          totalPrice: parseInt(hours[option._id], 10) * option.pricePerHour,
        }));

      const requestData = {
        userID: userId,
        selections,
        customRequests: userSelection?.customRequests || [],
        totalCost: userSelection?.totalCost || 0,
      };

      const url = `http://localhost:3001/musics${isEditMode ? `/${userSelection._id}` : ""}`;
      const method = isEditMode ? "PUT" : "POST";

      await axios({
        method,
        url,
        data: requestData,
        headers: { "Content-Type": "application/json" },
      });

      alert(`Music selection ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (error) {
      console.error("Error saving music selection:", error);
      alert("Failed to save music selection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-BgCreme px-20 py-10">
      <div className="container mx-auto bg-BgGray shadow-md rounded-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Music Selection</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Select Music Options</h3>
        <div className="grid grid-cols-3 gap-4">
          {musicOptions.map((option) => (
            <div key={option._id} className="relative border p-4 rounded-lg bg-gray-50">
              <p className="font-semibold mb-2">{option.name}</p>
              <p className="text-gray-600 mb-2">Price: ${option.pricePerHour}/hour</p>
              <label className="block">
                <input
                  type="number"
                  min="0"
                  placeholder="Hours"
                  value={hours[option._id] || ""}
                  onChange={(e) => handleHoursChange(option._id, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </label>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6 mb-4">Add Custom Requests</h3>
        <div className="flex gap-2">
          <textarea
            type="text"
            placeholder="Enter a custom request"
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={addCustomRequest}
            className="p-2 bg-BgPink text-BgFont rounded hover:bg-BgPinkMiddle"
          >
            Add Request
          </button>
        </div>
        <ul className="mt-4 list-disc pl-6 text-gray-700">
          {userSelection?.customRequests?.map((request, index) => (
            <li key={index}>{request.description}</li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-center text-gray-800 mt-6">
          Total Cost: <span className="text-blue-600">${userSelection?.totalCost || 0}</span>
        </h3>
        <button
          type="submit"
          className="block w-full mt-6 p-3 bg-BgPink text-BgFont font-semibold rounded-lg hover:bg-BgPinkMiddle"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditMode ? "Update" : "Submit"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default MusicSelectionForm;













// import React, { useState, useEffect } from "react";
// import axios from "axios";


// const MusicSelectionForm = () => {
//   const [musicOptions, setMusicOptions] = useState([]);
//   const [userSelection, setUserSelection] = useState(null); // Store user data from the database
//   const [hours, setHours] = useState({}); // Track hours for each music option
//   const [customRequest, setCustomRequest] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
//   const [loading, setLoading] = useState(false);

//   const userID = "6757527a366a20b9c472ea29"; // Replace with dynamic userID from context

//   // Fetch music options and user data on load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch music options
//         const optionsResponse = await axios.get("http://localhost:3001/musicoptions");
//         setMusicOptions(optionsResponse.data);

//         // Fetch user data if it exists
//         const userResponse = await axios.get(`http://localhost:3001/musics?userID=${userID}`);
//         if (userResponse.data) {
//           setUserSelection(userResponse.data);
//           setHours(
//             userResponse.data.selections.reduce((acc, selection) => {
//               acc[selection.optionID] = selection.hours;
//               return acc;
//             }, {})
//           );
//           setIsEditMode(true);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [userID]);

//   // Calculate total cost dynamically
//   useEffect(() => {
//     if (musicOptions.length > 0) {
//       const totalCost = musicOptions.reduce((total, option) => {
//         const selectedHours = parseInt(hours[option._id] || 0, 10);
//         return total + selectedHours * option.pricePerHour;
//       }, 0);

//       setUserSelection((prev) => ({
//         ...prev,
//         totalCost,
//       }));
//     }
//   }, [hours, musicOptions]);

//   const handleHoursChange = (optionID, value) => {
//     setHours((prev) => ({
//       ...prev,
//       [optionID]: value,
//     }));
//   };

//   const addCustomRequest = () => {
//     if (customRequest.trim()) {
//       setUserSelection((prev) => ({
//         ...prev,
//         customRequests: [...(prev?.customRequests || []), { description: customRequest }],
//       }));
//       setCustomRequest("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const selections = musicOptions
//         .filter((option) => hours[option._id] > 0)
//         .map((option) => ({
//           optionID: option._id,
//           hours: parseInt(hours[option._id], 10),
//           totalPrice: parseInt(hours[option._id], 10) * option.pricePerHour,
//         }));

//       const requestData = {
//         userID,
//         selections,
//         customRequests: userSelection?.customRequests || [],
//         totalCost: userSelection?.totalCost || 0,
//       };

//       const url = `http://localhost:3001/musics${isEditMode ? `/${userSelection._id}` : ""}`;
//       const method = isEditMode ? "PUT" : "POST";

//       await axios({
//         method,
//         url,
//         data: requestData,
//         headers: { "Content-Type": "application/json" },
//       });

//       alert(`Music selection ${isEditMode ? "updated" : "created"} successfully!`);
//     } catch (error) {
//       console.error("Error saving music selection:", error);
//       alert("Failed to save music selection!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Music Selection</h2>
//       <form onSubmit={handleSubmit}>
//         <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Select Music Options</h3>
//         <div className="grid grid-cols-3 gap-4">
//           {musicOptions.map((option) => (
//             <div key={option._id} className="relative border p-4 rounded-lg bg-gray-50">
//               <p className="font-semibold mb-2">{option.name}</p>
//               <p className="text-gray-600 mb-2">Price: ${option.pricePerHour}/hour</p>
//               <label className="block">
//                 <input
//                   type="number"
//                   min="0"
//                   placeholder="Hours"
//                   value={hours[option._id] || ""}
//                   onChange={(e) => handleHoursChange(option._id, e.target.value)}
//                   className="w-full p-2 border rounded"
//                 />
//               </label>
//             </div>
//           ))}
//         </div>

//         <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6 mb-4">Add Custom Requests</h3>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Enter a custom request"
//             value={customRequest}
//             onChange={(e) => setCustomRequest(e.target.value)}
//             className="flex-1 p-2 border rounded"
//           />
//           <button
//             type="button"
//             onClick={addCustomRequest}
//             className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Add Request
//           </button>
//         </div>
//         <ul className="mt-4 list-disc pl-6 text-gray-700">
//           {userSelection?.customRequests?.map((request, index) => (
//             <li key={index}>{request.description}</li>
//           ))}
//         </ul>

//         <h3 className="text-xl font-bold text-center text-gray-800 mt-6">
//           Total Cost: <span className="text-blue-600">${userSelection?.totalCost || 0}</span>
//         </h3>
//         <button
//           type="submit"
//           className="block w-full mt-6 p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : isEditMode ? "Update" : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MusicSelectionForm;
