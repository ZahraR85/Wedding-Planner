import { useState } from "react";
import axios from "axios";
import DescriptionBox from "../components/MakeupDescriptionBox";

const features = [
  { id: "makeup", label: "Makeup", price: 400, description: "Professional makeup for the bride and groom." },
  { id: "shoes", label: "Shoes", price: 100, description: "Elegant shoes for the perfect look." },
  { id: "dress", label: "Dress", price: 500, description: "Designer dress for the big day." },
  { id: "nail", label: "Nail", price: 200, description: "Beautiful nail art for the bride." },
  { id: "hairstyle", label: "Hairstyle", price: 400, description: "Stunning hairstyle for the bride and groom." },
  { id: "special", label: "Special", price: 300, description: "Special package with unique add-ons." },
];

const MakeupSelector = () => {
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [total, setTotal] = useState(0);
  const [currentDescription, setCurrentDescription] = useState("");

  const handleCheckboxChange = (id) => {
    setSelectedFeatures((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      calculateTotal(updated);
      return updated;
    });
  };

  const calculateTotal = (selected) => {
    let newTotal = 0;
    features.forEach((feature) => {
      if (selected[feature.id]) {
        newTotal += feature.price;
      }
    });
    setTotal(newTotal);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/makeups", {
        userID: "6757527a366a20b9c472ea29",
        ...selectedFeatures,
      });
      alert("Features saved successfully!");
    } catch (error) {
      console.error("Error saving features:", error);
      alert("Failed to save features.");
    }
  };

  return (
    <div>
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
                checked={!!selectedFeatures[feature.id]}
                onChange={() => handleCheckboxChange(feature.id)}
                className="mr-2"
              />
              <label htmlFor={feature.id} className="text-lg">
                {feature.label} (${feature.price})
              </label>
            </div>
          </div>
        ))}
        <div className="text-right mt-4 font-bold">Total: ${total}</div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeupSelector;