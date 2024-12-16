import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Photography = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    photography: { number: 0, price: 300 },
    videography: { number: 0, price: 300 },
    clipConstruction: { number: 0, price: 200 },
    physicalAlbum: { selected: false, price: 500 },
    giftImageSize: { number: 0, price: 10 },
  });

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Redirect unauthenticated users to SignIn
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch data if the userId is available
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/photography?userId=${userId}`);
          if (response.status === 200) {
            const fetchedData = response.data;

            // Merge default values with fetched data
            setFormData({
              photography: { number: 0, price: 300, ...fetchedData.photography },
              videography: { number: 0, price: 300, ...fetchedData.videography },
              clipConstruction: { number: 0, price: 200, ...fetchedData.clipConstruction },
              physicalAlbum: { selected: false, price: 500, ...fetchedData.physicalAlbum },
              giftImageSize: { number: 0, price: 10, ...fetchedData.giftImageSize },
            });
            setIsEditMode(true);
          }
        } catch (error) {
          console.error("Error fetching photography data:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  // Calculate total price dynamically
  useEffect(() => {
    const calculatedTotal = Object.keys(formData).reduce((sum, key) => {
      const feature = formData[key];
      if (feature.number && feature.price) {
        // For features with 'number' and 'price' properties, like "photography" and "videography"
        return sum + feature.number * feature.price;
      } else if (feature.selected && feature.price) {
        // For features with 'selected' property, like "physicalAlbum"
        return sum + feature.price;
      }
      return sum;
    }, 0);

    setTotal(calculatedTotal);
  }, [formData]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value, checked, dataset } = event.target;
    const category = dataset.category;

    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [name]: name === "selected" ? checked : parseInt(value, 10),
      },
    }));
  };

  // Submit form data
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/photography", {
        userId,
        ...formData,
      });

      if (response.status === 200) {
        alert(response.data.message);
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error saving photography data:", error);
      alert("Failed to save photography data!");
    } finally {
      setLoading(false);
    }
  };

  // Render UI
  if (!userId) return null;

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold m-10">Photography Services</h1>
        <label className="flex items-center space-x-2">
          Photography sessions (per 3 hours 300$):
          <input
            type="number"
            name="number"
            data-category="photography"
            value={formData.photography?.number || 0}
            onChange={handleChange}
            className="border mx-2 p-2 rounded w-1/3"
          />
        </label>
        <label className="flex items-center space-x-2">
          Videography sessions (per 3 hours 300$):
          <input
            type="number"
            name="number"
            data-category="videography"
            value={formData.videography?.number || 0}
            onChange={handleChange}
            className="border mx-2 p-2 rounded w-1/3"
          />
        </label>
        <label className="flex items-center space-x-2">
          Clip Construction (per 3 minutes 200$):
          <input
            type="number"
            name="number"
            data-category="clipConstruction"
            value={formData.clipConstruction?.number || 0}
            onChange={handleChange}
            className="border mx-2 p-2 rounded w-1/3"
          />
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="selected"
            data-category="physicalAlbum"
            checked={formData.physicalAlbum?.selected || false}
            onChange={handleChange}
          />
          <span>Physical Album with 20 photos 500$</span>
        </label>
        <label className="flex items-center space-x-2">
          Gift Image for guests 10$ (Size 15x18):
          <input
            type="number"
            name="number"
            data-category="giftImageSize"
            value={formData.giftImageSize?.number || 0}
            onChange={handleChange}
            className="border mx-2 p-2 rounded w-1/3"
          />
        </label>
        <h2 className="text-lg font-bold">Total Price: ${total}</h2>
        <button
          onClick={handleSubmit}
          className="bg-btnLight text-white hover:bg-btnDark w-full px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Photography;
