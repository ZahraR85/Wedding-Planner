/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

// MusicOptionsPage component
const MusicOptionsPage = () => {
  const { userId, isAuthenticated, role } = useAppContext();
  const navigate = useNavigate(); // Navigation hook
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

  // Function to fetch music options
  const fetchMusicOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/musicoptions");
      setMusicOptions(response.data);
    } catch (error) {
      console.error("Error fetching music options", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || role !== "admin") {
      toast.warn("You must sign in as Admin to access this page.");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  }, [isAuthenticated, role, navigate]);

  // Fetch the music options when the component is mounted
  useEffect(() => {
    if (userId) {
      fetchMusicOptions();
    }
  }, [userId]);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prevOption) => ({
      ...prevOption,
      [name]: value,
    }));
  };

  // Handle adding a new music option
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
      fetchMusicOptions(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding music option", error);
    }
  };

  // Handle editing a music option
  const handleEditOption = async (id) => {
    const optionToEdit = musicOptions.find((option) => option._id === id);
    setNewOption(optionToEdit);
    setIsEditing(true);
    setEditingId(id);
  };

  // Handle updating a music option
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
      fetchMusicOptions(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating music option", error);
    }
  };

  // Handle deleting a music option
  const handleDeleteOption = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/musicoptions/${id}`);
      fetchMusicOptions(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting music option", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center px-4 lg:px-20 py-6 lg:py-10 bg-[url('https://i.postimg.cc/mgjJ2Qjw/music1.png')]">
      <ToastContainer />
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative mx-auto w-full max-w-full lg:max-w-[calc(70%-100px)] bg-opacity-80 shadow-md rounded-lg p-4 space-y-6">
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
      </div>

      <div className="w-full p-6 bg-customBg1 shadow-lg rounded-lg space-y-5">
  <h2 className="text-2xl font-bold mb-4">Available Music Options</h2>
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
    {musicOptions.map((option) => (
      <li
        key={option._id}
        className="flex flex-col justify-between items-start p-4 border border-gray-300 rounded bg-white shadow"
      >
        <div>
          <h3 className="font-semibold text-lg">{option.name}</h3>
          <p>Category: {option.category}</p>
          <p>Price per Hour: €{option.pricePerHour}</p>
        </div>
        {/* Separate background section for buttons */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          <button
            onClick={() => handleEditOption(option._id)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
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
</div>
  );
};

export default MusicOptionsPage;
