import React, { useState, useEffect } from "react";
import axios from "axios";

// MusicOption component
const MusicOptionsPage = () => {
  const [musicOptions, setMusicOptions] = useState([]);
  const [newOption, setNewOption] = useState({
    category: "",
    name: "",
    pricePerHour: "",
    description: "",
    additionalFeatures: [],
    sampleLink: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch all music options
  const fetchMusicOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/musicoptions");
      setMusicOptions(response.data);
    } catch (error) {
      console.error("Error fetching music options", error);
    }
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prevOption) => ({
      ...prevOption,
      [name]: value,
    }));
  };

  // Handle adding new music option
  const handleAddOption = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/musicoptions", newOption);
      setNewOption({
        category: "",
        name: "",
        pricePerHour: "",
        description: "",
        additionalFeatures: [],
        sampleLink: "",
      });
      fetchMusicOptions(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding music option", error);
    }
  };

  // Handle editing music option
  const handleEditOption = async (id) => {
    const optionToEdit = musicOptions.find((option) => option._id === id);
    setNewOption(optionToEdit);
    setIsEditing(true);
    setEditingId(id);
  };

  // Handle updating music option
  const handleUpdateOption = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/musicoptions/${editingId}`, newOption);
      setIsEditing(false);
      setEditingId(null);
      setNewOption({
        category: "",
        name: "",
        pricePerHour: "",
        description: "",
        additionalFeatures: [],
        sampleLink: "",
      });
      fetchMusicOptions(); // Refresh list after updating
    } catch (error) {
      console.error("Error updating music option", error);
    }
  };

  // Handle deleting music option
  const handleDeleteOption = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/musicoptions/${id}`);
      fetchMusicOptions(); // Refresh list after deleting
    } catch (error) {
      console.error("Error deleting music option", error);
    }
  };

  // Fetch the music options when the component is mounted
  useEffect(() => {
    fetchMusicOptions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Music Options</h1>

      <form
        className="mb-8 space-y-4"
        onSubmit={isEditing ? handleUpdateOption : handleAddOption}
      >
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={newOption.category}
            onChange={handleInputChange}
            className="p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={newOption.name}
            onChange={handleInputChange}
            className="p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price per Hour</label>
          <input
            type="number"
            name="pricePerHour"
            value={newOption.pricePerHour}
            onChange={handleInputChange}
            className="p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={newOption.description}
            onChange={handleInputChange}
            className="p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sample Link</label>
          <input
            type="text"
            name="sampleLink"
            value={newOption.sampleLink}
            onChange={handleInputChange}
            className="p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
        >
          {isEditing ? "Update Option" : "Add New Option"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Available Music Options</h2>
      <ul>
        {musicOptions.map((option) => (
          <li key={option._id} className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">{option.name}</h3>
              <p>Category: {option.category}</p>
              <p>Price per Hour: €{option.pricePerHour}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditOption(option._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteOption(option._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicOptionsPage;
