import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Outlet } from 'react-router-dom';

const ReceptionSelector = () => {
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

    // Handle input change
    const handleChange = (featureName, value, price) => {
        const newValue = parseInt(value) || 0;
        setFormData((prev) => ({ ...prev, [featureName]: newValue }));

        const newTotal = Object.keys(formData).reduce((acc, key) => {
            return key === featureName
                ? acc + newValue * price
                : acc + formData[key] * features.find((f) => f.name === key).price;
        }, 0);

        setTotal(newTotal);
    };

    // Handle form submission
    const handleSubmit = async () => {
        const userID = "6757527a366a20b9c472ea29"; // Example userID
        const payload = {
            userID,
            Starter: { selected: formData.Starter, price: 5 },
            MainCourse: { selected: formData.MainCourse, price: 15 },
            Dessert: { selected: formData.Dessert, price: 6 },
            ColdDrink: { selected: formData.ColdDrink, price: 7 },
            CafeBar: { selected: formData.CafeBar, price: 4 },
            Fruiets: { selected: formData.Fruiets, price: 9 },
            Cake: { selected: formData.Cake, price: 3 },
            Waiter: { selected: formData.Waiter, price: 20 },
        };
    
        console.log("Payload being sent:", payload);
    
        try {
            const response = await axios.post("http://localhost:3001/receptions", payload);
            alert("Data saved successfully!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Failed to save data!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Reception Features</h1>
            <p className="text-gray-600 text-center mb-8">{description}</p>

            <div>
      <h1>Facilities</h1>
      <Outlet />
    </div>
    
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Feature</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Price ($/person)</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Guests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature) => (
                            <tr
                                key={feature.name}
                                onMouseEnter={() => setDescription(feature.desc)}
                                onMouseLeave={() =>
                                    setDescription("Select a feature to see its description.")
                                }
                                className="hover:bg-gray-100"
                            >
                                <td className="border border-gray-300 px-4 py-2">{feature.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{feature.price}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData[feature.name]}
                                        onChange={(e) =>
                                            handleChange(feature.name, e.target.value, feature.price)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <strong className="text-lg">Total: ${total}</strong>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ReceptionSelector;