import React, { useState, useEffect } from "react";
import axios from "axios";

const MusicSelectionForm = () => {
  const [musicOptions, setMusicOptions] = useState([]);
  const [userSelection, setUserSelection] = useState({
    userID: "6757527a366a20b9c472ea29",
    selections: [],
    customRequests: [],
    totalCost: 0,
  });
  const [customRequest, setCustomRequest] = useState("");
  const [hours, setHours] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/musicoptions")
      .then((response) => {
        setMusicOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching music options:", error);
      });
  }, []);

  useEffect(() => {
    const totalCost = musicOptions.reduce((total, option) => {
      const selectedHours = parseInt(hours[option._id] || 0, 10);
      return total + selectedHours * option.pricePerHour;
    }, 0);
    setUserSelection((prev) => ({ ...prev, totalCost }));
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
        customRequests: [...prev.customRequests, { description: customRequest }],
      }));
      setCustomRequest("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selections = musicOptions
      .filter((option) => hours[option._id] > 0)
      .map((option) => ({
        optionID: option._id,
        hours: parseInt(hours[option._id], 10),
        totalPrice: parseInt(hours[option._id], 10) * option.pricePerHour,
      }));

    const newUserSelection = {
      ...userSelection,
      selections,
    };

    axios
      .post("http://localhost:3001/musics", newUserSelection)
      .then((response) => {
        alert("Music selection created successfully!");
      })
      .catch((error) => {
        console.error("Error creating music selection:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Music Selection</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Select Music Options</h3>
        <div className="grid grid-cols-3 gap-4">
          {musicOptions.map((option) => (
            <div
              key={option._id}
              onMouseEnter={() => setHoveredOption(option._id)}
              onMouseLeave={() => setHoveredOption(null)}
              className="relative border p-4 rounded-lg bg-gray-50"
            >
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
              {hoveredOption === option._id && (
                <div className="absolute top-2 left-full ml-4 p-4 bg-red-100 border rounded shadow-lg w-64 z-10">
                  <p className="text-lg">{option.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6 mb-4">Add Custom Requests</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a custom request"
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={addCustomRequest}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Request
          </button>
        </div>
        <ul className="mt-4 list-disc pl-6 text-gray-700">
          {userSelection.customRequests.map((request, index) => (
            <li key={index}>{request.description}</li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-center text-gray-800 mt-6">Total Cost: <span className="text-blue-600">${userSelection.totalCost}</span></h3>
        <button
          type="submit"
          className="block w-full mt-6 p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Submit Selection
        </button>
      </form>
    </div>
  );
};

export default MusicSelectionForm;
