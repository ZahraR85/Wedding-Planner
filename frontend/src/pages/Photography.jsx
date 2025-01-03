import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const features = [
  { id: "photography", label: "Photography (per 3 hours)", price: 300 },
  { id: "videography", label: "Videography (per 3 hours)", price: 300 },
  { id: "clipConstruction", label: "Clip Construction (per 3 minutes)", price: 200 },
  { id: "physicalAlbum", label: "Physical Album with 20 photos", price: 500 },
  { id: "giftImageSize", label: "Gift Image for guests (Size 15x18)", price: 10 },
];

const Photography = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/photographies?userId=${userId}`);
        console.log("Fetched data:", response.data);

        if (response.data && response.data.length > 0) {
          const existingData = response.data[0]; // Access the first object in the array
          const updatedFormData = {
            photography: existingData.photography || { number: 0, price: 300 },
            videography: existingData.videography || { number: 0, price: 300 },
            clipConstruction: existingData.clipConstruction || { number: 0, price: 200 },
            physicalAlbum: existingData.physicalAlbum || { selected: false, price: 500 },
            giftImageSize: existingData.giftImageSize || { number: 0, price: 10 },
          };
          setFormData(updatedFormData);
          setIsEditMode(true);
        } else {
          console.log("No data found for this user. Initializing with defaults.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Calculate total price dynamically based on the form data
  useEffect(() => {
    const calculatedTotal = Object.keys(formData).reduce((sum, key) => {
      const feature = formData[key];
      if (feature.number && feature.price) {
        return sum + feature.number * feature.price;
      } else if (feature.selected && feature.price) {
        return sum + feature.price;
      }
      return sum;
    }, 0);
    setTotal(calculatedTotal);
  }, [formData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;
    const category = dataset.category;

    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (type === "checkbox") {
        updatedData[category][name] = checked;
      } else {
        updatedData[category][name] = parseInt(value, 10);
      }
      return updatedData;
    });
  };

  // Submit form data
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = "http://localhost:3001/photographies";
      const requestData = {
        userID: userId,
        photography: formData.photography,
        videography: formData.videography,
        clipConstruction: formData.clipConstruction,
        physicalAlbum: formData.physicalAlbum,
        giftImageSize: formData.giftImageSize,
      };

      console.log("Sending data:", requestData);
      const response = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
      setIsEditMode(true); // Switch to edit mode after submission
    } catch (error) {
      console.error("Error saving photography data:", error);
      alert("Failed to save photography data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/Kv1WnL9Q/photography.png')]">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative mx-auto w-full max-w-[calc(60%-130px)] bg-opacity-80 shadow-md rounded-lg p-5 space-y-4">
        <h1 className="text-2xl font-bold text-center text-BgFont m-20">Photography Services</h1>
        {features.map((feature) => (
          <label key={feature.id} className="flex items-center justify-between">
            <span className="text-m font-bold text-BgFont">{feature.label}:</span>
            {feature.id === "physicalAlbum" ? (
              <input
                type="checkbox"
                name="selected"
                data-category={feature.id}
                checked={formData[feature.id]?.selected || false}
                onChange={handleChange}
              />
            ) : (
              <input
                type="number"
                name="number"
                data-category={feature.id}
                value={formData[feature.id]?.number || 0}
                onChange={handleChange}
                className="border p-2 rounded w-1/3"
              />
            )}
          </label>
        ))}
        <h2 className="text-lg font-bold text-BgFont text-center">Total Price: ${total}</h2>
        <button
          onClick={handleSubmit}
          className="bg-BgPinkMiddle text-BgFont text-lg font-bold hover:bg-BgPinkDark w-full px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Photography;
