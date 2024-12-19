import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; // Import AppContext

const ReceptionSelector = () => {
    const { userId, isAuthenticated } = useAppContext(); // Retrieve userId and isAuthenticated from context
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
    const [isEditMode, setIsEditMode] = useState(false); // To track if the user already has reception data





    const [description, setDescription] = useState("Select a feature to see its description.");

    // Feature details
    const features = [
        { name: "Starter", price: 5, desc: "This is the starter feature description." },
        { name: "MainCourse", price: 15, desc: "This is the main course feature description." },
        { name: "Dessert", price: 6, desc: "This is the dessert feature description." },
        { name: "ColdDrink", price: 7, desc: "This is the cold drink feature description." },
        { name: "CafeBar", price: 4, desc: "This is the cafe bar feature description." },
        { name: "Fruiets", price: 9, desc: "This is the fruits feature description." },
        { name: "Cake", price: 3, desc: "This is the cake feature description." },
        { name: "Waiter", price: 20, desc: "This is the waiter feature description." },
    ];



    // Redirect to SignIn if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            alert("Please sign in to access this page.");
            navigate("/signin");
        }
    }, [isAuthenticated, navigate]);

    // Fetch existing data for the user
    useEffect(() => {
        if (userId) {
            const fetchReceptionData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/receptions?userId=${userId}`);
                    if (response.data && response.data.length > 0) {
                        const normalizedData = features.reduce((acc, feature) => {
                            acc[feature.name] = parseInt(response.data[0][feature.name]) || 0;
                            return acc;
                        }, {});
                        setFormData({ ...normalizedData, _id: response.data[0]._id });
                        setIsEditMode(true);
                    }
                } catch (error) {
                    console.error("Error fetching reception data:", error);
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

    // Handle input change
    const handleChange = (e, featureName) => {
        const value = Math.max(0, parseInt(e.target.value) || 0); // Ensure non-negative numbers
        setFormData((prev) => ({ ...prev, [featureName]: value }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const url = `http://localhost:3001/receptions${isEditMode ? `/${formData._id}` : ""}`;
            const method = isEditMode ? "PUT" : "POST";
            const response = await axios({
                method,
                url,
                data: { ...formData, userId },
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200 || response.status === 201) {
                alert(`Reception data ${isEditMode ? "updated" : "saved"} successfully!`);
                if (!isEditMode) {
                    setFormData((prev) => ({ ...prev, _id: response.data._id }));
                    setIsEditMode(true);
                }
            } else {
                alert("Failed to save data!");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Failed to save data!");
        }
    };

    // Render UI
    return (
        <div className="flex justify-center items-start pt-20 min-h-screen bg-[url('./images/catering.png')] bg-cover bg-center">

            <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
                <p className="text-gray-600 text-center mb-8">{description}</p>
                <h1 className="text-2xl font-bold m-10">Reception Features</h1>
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
                            <tr key={feature.name} onMouseEnter={() => setDescription(feature.desc)}
                                onMouseLeave={() =>
                                    setDescription("Select a feature to see its description.")
                                }
                                className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{feature.name}</td>


                                <td className="border border-gray-300 px-4 py-2">{feature.price}</td>
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
