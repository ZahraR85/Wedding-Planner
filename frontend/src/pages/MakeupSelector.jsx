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
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [total, setTotal] = useState(0);
  const [currentDescription, setCurrentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please sign in to continue.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/makeups?userId=${userId}`);
        if (response.data && response.data.length > 0) {
          const existingData = response.data[0];
          const formattedFeatures = Object.fromEntries(
            features.map((feature) => [
              feature.id,
              { selected: existingData[feature.id]?.selected || false, price: feature.price },
            ])
          );
          setSelectedFeatures(formattedFeatures);
          setTotal(existingData.total || 0);
          setFormData(existingData);
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching makeup data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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
      const url = `http://localhost:3001/makeups${isEditMode ? `/${formData._id}` : ""}`;
      const method = isEditMode ? "PUT" : "POST";
      const requestData = {
        userID: userId,
        ...Object.fromEntries(Object.entries(selectedFeatures).map(([key, value]) => [key, value.selected])),
        total,
      };

      const response = await axios({
        method,
        url,
        data: requestData,
        headers: { "Content-Type": "application/json" },
      });

      alert(`Makeup data ${isEditMode ? "updated" : "saved"} successfully!`);
      if (!isEditMode) {
        setFormData((prev) => ({ ...prev, _id: response.data._id }));
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error saving makeup data:", error);
      alert("Failed to save makeup data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold m-10">Makeup Features</h1>
        <DescriptionBox description={currentDescription} />
        <form className="space-y-4">
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
                <label htmlFor={feature.id} className="text-lg">
                  {feature.label} (${feature.price})
                </label>
              </div>
            </div>
          ))}
        </form>
        <div className="text-right mt-4 font-bold">Total: ${total}</div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MakeupSelector;
