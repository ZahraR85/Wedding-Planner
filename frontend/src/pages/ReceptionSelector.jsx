import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const features = [
  {
    name: "Starter",
    price: 5,
    description:
      "Contains Onion Rings, Chicken Wings, Fish and Chips, Mozzarella Sticks, and Stuffed Mushrooms. Available in classic, spicy, gluten-free, keto-friendly, and kids’ special models.",
  },
  {
    name: "MainCourse",
    price: 15,
    description:
      "Includes Grilled Chicken Breast, Beef Steak, Vegetarian Lasagna, Shrimp Alfredo, and Lamb Chops. Options available are gourmet, low-calorie, vegan, BBQ-style, and international fusion.",
  },
  {
    name: "Dessert",
    price: 6,
    description:
      "Features Chocolate Fudge Cake, Strawberry Cheesecake, Ice Cream Sundaes, Tiramisu, and Crème Brûlée. Available in sugar-free, classic, seasonal fruits, mini-portions, and deluxe servings.",
  },
  {
    name: "ColdDrink",
    price: 7,
    description:
      "Offers Cola, Lemonade, Iced Tea, Fruit Punch, and Sparkling Water. Variants include diet, classic, natural sweeteners, carbonated, and alcohol-free mocktail mixes.",
  },
  {
    name: "CafeBar",
    price: 4,
    description:
      "Provides Espresso, Cappuccino, Latte, Hot Chocolate, and Iced Coffee. Choose from regular, decaf, organic, blended flavors (vanilla, hazelnut), and extra-strong options.",
  },
  {
    name: "Fruiets",
    price: 9,
    description:
      "Features Fresh Apple Slices, Banana Halves, Orange Wedges, Berries Mix, and Exotic Fruit Platters. Available in seasonal selections, tropical medleys, organic, dried fruits mix, and cocktail garnish sets.",
  },
  {
    name: "Cake",
    price: 3,
    description:
      "Includes Vanilla Sponge, Chocolate Truffle, Red Velvet, Carrot Cake, and Black Forest. Variants include personalized designs, mini cupcakes, layered cakes, gluten-free, and special occasion cakes.",
  },
  {
    name: "Waiter",
    price: 20,
    description:
      "Services include Table Serving, Buffet Assistance, Beverage Refills, Special Requests Handling, and Cleanup Support. Models offered are standard service, premium service, international cuisine experts, event-specific attire, and multilingual waitstaff.",
  },
];

const ReceptionSelector = () => {
  const { userId, isAuthenticated,addToCart } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Starter: 0,
    MainCourse: 0,
    Dessert: 0,
    ColdDrink: 0,
    CafeBar: 0,
    Fruiets: 0,
    Cake: 0,
    Waiter: 0,
  });

  const [total, setTotal] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState("Select a feature to see its description.");

  // Redirect to SignIn if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Please sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch existing data for the user
  useEffect(() => {
    if (userId) {
      const fetchReceptionData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/receptions?userID=${userId}`);
          if (response.data) {
            const normalizedData = features.reduce((acc, feature) => {
              acc[feature.name] = response.data[feature.name]?.Number || 0;
              return acc;
            }, {});
            setFormData({ ...normalizedData });
            setIsEditMode(true);
          }
        } catch (error) {
          console.error("Error fetching reception data:", error);
          toast.error("please add your entertain");
        }
      };
      fetchReceptionData();
    }
  }, [userId]);

  // Calculate total price dynamically
  useEffect(() => {
    const total = features.reduce((sum, feature) => {
      return sum + formData[feature.name] * feature.price;
    }, 0);
    setTotal(total);
  }, [formData]);

  // Handle input change for the reception features
  const handleChange = (e, featureName) => {
    const value = Math.max(0, parseInt(e.target.value) || 0); // Ensure non-negative numbers
    setFormData((prev) => ({ ...prev, [featureName]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const url = `http://localhost:3001/receptions`; // Same URL for both create and update
      const response = await axios({
        method: "POST", // Always use POST for both actions
        url,
        data: { ...formData, userID: userId }, // Send userId and reception data
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success(`entertain ${isEditMode ? "updated" : "created"} successfully!`);
        if (!isEditMode) {
          setIsEditMode(true); // Switch to edit mode after creating
        }
      // Add total to shopping cart
      addToCart({
        name: "Reception Catering",
        type: "Reception",
        total,
        description: "Catering services for your reception",
      });
    } else {
      toast.error("Failed to save data!");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("Failed to save data!");
  }
};
  
  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-[url('./images/catering.png')] bg-cover bg-center">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
      <ToastContainer />
        <p className=" text-2xl text-BgFont  font-bold m-10 text-center mb-8">{description}</p>
        <h1 className="text-3xl   font-bold m-10">Reception Features</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Feature</th>
              <th className="border border-gray-300 px-4 py-2">Price ($/person)</th>
              <th className="border border-gray-300 px-4 py-2">Guests</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr
                key={feature.name}
                onMouseEnter={() => setDescription(feature.description)}
                onMouseLeave={() => setDescription("Select a feature to see its description.")}
                className="hover:bg-gray-100"
              >
                <td className="border border-gray-300 px-4 py-2">{feature.name}</td>
                <td className="border border-gray-300 px-4 py-2">${feature.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={formData[feature.name] || 0}
                    onChange={(e) => handleChange(e, feature.name)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-lg font-bold mt-6">Total Price: ${total}</h2>
        <button
          onClick={handleSubmit}
          className="w-full bg-BgPinkMiddle text-BgFont py-2 px-4 rounded hover:bg-BgPinkDark"
        >
          {isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ReceptionSelector;
