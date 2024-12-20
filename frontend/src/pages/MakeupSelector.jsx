import { useState, useEffect } from "react";
import axios from "axios";
import DescriptionBox from "../components/MakeupDescriptionBox";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const features = [
  { id: "makeup", label: "Makeup", price: 400, description: "Professional makeup for the bride and groom." },
  { id: "shoes", label: "Shoes", price: 100, description: "Elegant shoes for the perfect look." },
  { id: "dress", label: "Dress", price: 500, description: "Designer dress for the big day." },
  { id: "nail", label: "Nail", price: 200, description: "Beautiful nail art for the bride." },
  { id: "hairstyle", label: "Hairstyle", price: 400, description: "Stunning hairstyle for the bride and groom." },
  { id: "special", label: "Special", price: 300, description: "Special package with unique add-ons." },
];

const MakeupSelector = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState({
    makeup: { selected: false, price: 400 },
    dress: { selected: false, price: 500 },
    nail: { selected: false, price: 200 },
    hairstyle: { selected: false, price: 400 },
    shoes: { selected: false, price: 100 },
    special: { selected: false, price: 300 },
  });
  const [total, setTotal] = useState(0); // Total for UI display
  const [currentDescription, setCurrentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/makeups?userID=${userId}`);
        //console.log("API Response:", response.data); // Log the response
  
        if (response.data) {
          const existingData = response.data;
  
          setSelectedFeatures({
            makeup: existingData.makeup || { selected: false, price: 400 },
            dress: existingData.dress || { selected: false, price: 500 },
            nail: existingData.nail || { selected: false, price: 200 },
            hairstyle: existingData.hairstyle || { selected: false, price: 400 },
            shoes: existingData.shoes || { selected: false, price: 100 },
            special: existingData.special || { selected: false, price: 300 },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  
  // Calculate the total dynamically
  useEffect(() => {
    const calculatedTotal = Object.keys(selectedFeatures).reduce((sum, key) => {
      const feature = selectedFeatures[key];
      return feature?.selected ? sum + feature.price : sum;
    }, 0);
    setTotal(calculatedTotal);
  }, [selectedFeatures]);

  const handleCheckboxChange = (id) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id]?.selected },
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:3001/makeups`;
      const requestData = {
        userID: userId,
        makeup: selectedFeatures.makeup?.selected || false,
        dress: selectedFeatures.dress?.selected || false,
        nail: selectedFeatures.nail?.selected || false,
        hairstyle: selectedFeatures.hairstyle?.selected || false,
        shoes: selectedFeatures.shoes?.selected || false,
        special: selectedFeatures.special?.selected || false,
      };
      console.log("Sending data:", requestData);
  
      const response = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });
  
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error saving makeup data:", error);
      alert("Failed to save makeup data!");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/TwNqd9Bm/makeup2.jpg')]">
        {/* Overlay for controlling opacity */}
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative mx-auto w-full max-w-[calc(60%-250px)] bg-opacity-80 shadow-md rounded-lg p-5 space-y-4">
              {/* <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">*/}
      {/*<div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">*/}
        <h1 className="text-2xl font-bold text-BgFont m-10">select services that you need:</h1>
        <DescriptionBox description={currentDescription} />
        <form className="space-y-4 font-bold">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between">
              <div
                onMouseEnter={() => setCurrentDescription(feature.description)}
                onMouseLeave={() => setCurrentDescription("")}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={feature.id}
                  checked={selectedFeatures[feature.id]?.selected || false}
                  onChange={() => handleCheckboxChange(feature.id)}
                  className="mr-2"
                />
                <label htmlFor={feature.id} className="text-lg font-bold">
                  {feature.label} (${feature.price})
                </label>
              </div>
            </div>
          ))}
        </form>
        <div className="text-center text-xl text-BgFont mt-4 font-bold">Total: ${total}</div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-BgPinkMiddle text-BgFont py-2 px-4 rounded hover:bg-BgPinkDark"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MakeupSelector;
