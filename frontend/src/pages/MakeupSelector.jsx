import { useState, useEffect } from "react";
import axios from "axios";
import DescriptionBox from "../components/MakeupDescriptionBox";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const features = [
  {
    id: "makeup",
    label: "Makeup",
    price: 400,
    description:
      "Professional makeup for the bride and groom, including high-definition airbrush techniques, contouring, and personalized palettes tailored to skin tone and style. Includes trials and touch-ups throughout the day.",
  },
  {
    id: "shoes",
    label: "Shoes",
    price: 100,
    description:
      "Elegant shoes for the perfect look, available in custom designs and a variety of styles including stilettos, flats, and classic formal shoes. Comfort and style ensured for all-day wear.",
  },
  {
    id: "dress",
    label: "Dress",
    price: 500,
    description:
      "Designer dress for the big day, with options for traditional gowns, modern silhouettes, and custom-made designs. Includes fitting sessions and fabric customization for a flawless fit.",
  },
  {
    id: "nail",
    label: "Nail",
    price: 200,
    description:
      "Beautiful nail art for the bride, offering services like gel extensions, intricate designs, and a wide range of colors to complement the wedding theme. Includes a consultation for unique styling.",
  },
  {
    id: "hairstyle",
    label: "Hairstyle",
    price: 400,
    description:
      "Stunning hairstyles for the bride and groom, including updos, curls, and sleek styles. Each style is customized based on face shape, outfit, and personal preference. Includes pre-event trials.",
  },
  {
    id: "special",
    label: "Special",
    price: 300,
    description:
      "Special package with unique add-ons like skincare treatments, personalized gift boxes, or additional beauty services for family members. Perfect for an all-inclusive wedding experience.",
  },
];

const MakeupSelector = () => {
  const { userId, isAuthenticated, addToShoppingCard} = useAppContext();
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
      toast.error("You must sign in to access this page.", {
        position: toast.POSITION.TOP_CENTER,
      });
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
        toast.error("Failed to fetch data. Please try again later.");
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
      const makeupUrl = `http://localhost:3001/makeups`;
      const shoppingCartUrl = `http://localhost:3001/shoppingcards`;
      const requestData = {
        userID: userId,
        makeup: selectedFeatures.makeup?.selected || false,
        dress: selectedFeatures.dress?.selected || false,
        nail: selectedFeatures.nail?.selected || false,
        hairstyle: selectedFeatures.hairstyle?.selected || false,
        shoes: selectedFeatures.shoes?.selected || false,
        special: selectedFeatures.special?.selected || false,
      };
  
      await axios.post(makeupUrl, requestData, {
        headers: { "Content-Type": "application/json" },
      });

     // Save shopping cart data
    const shoppingCartData = {
      userID: userId,
      serviceName: 'Makeup',
      price: total,
    };
console.log (shoppingCartData);
    await axios.post(shoppingCartUrl, shoppingCartData, {
      headers: { "Content-Type": "application/json" },
    });

    // Frontend-only addition (optional if the backend handles the cart data)
    addToShoppingCard(shoppingCartData);

    toast.success("Makeup data and total price added to shopping cart successfully!");
    //navigate("/shoppingCard");
  } catch (error) {
    console.error("Failed to save makeup data or add to shopping cart.", error);
    toast.error("Error saving data or adding to shopping cart.");
  } finally {
    setLoading(false);
  }
};

  return (

    <div>
      <ToastContainer />

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
            <div key={feature.id} className="flex items-center text-BgFont justify-between">
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
    </div>



  );
};

export default MakeupSelector;
