import { useState } from "react";

const Photography = () => {
  const [formData, setFormData] = useState({
    userId: "",
    photography: { number: 0, price: 300 },
    videography: { number: 0, price: 300 },
    clipConstruction: { number: 0, price: 200 },
    physicalAlbum: { selected: false, price: 500 },
    giftImageSize: { number: 0, price: 10 },
  });

  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset.category) {
      // Handle nested fields (e.g., photography.number)
      setFormData((prev) => ({
        ...prev,
        [dataset.category]: {
          ...prev[dataset.category],
          [name]: type === "checkbox" ? checked : parseFloat(value),
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/photography", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data added successfully!");
        setFormData({
          userId: formData.userId, // Keep userId
          photography: { number: 0, price: 300 },
          videography: { number: 0, price: 300 },
          clipConstruction: { number: 0, price: 200 },
          physicalAlbum: { selected: false, price: 500 },
          giftImageSize: { number: 0, price: 10 },
        });
      } else {
        alert("Failed to add data!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch("http://localhost:3001/photography", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data updated successfully!");
      } else {
        alert("Failed to update data!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Photography Services</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="User ID"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="number"
          data-category="photography"
          value={formData.photography.number}
          onChange={handleChange}
          placeholder="Photography sessions (per 3 hours)"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="number"
          data-category="videography"
          value={formData.videography.number}
          onChange={handleChange}
          placeholder="Videography sessions (per 3 hours)"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="number"
          data-category="clipConstruction"
          value={formData.clipConstruction.number}
          onChange={handleChange}
          placeholder="Clip Construction (per minute)"
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="selected"
            data-category="physicalAlbum"
            checked={formData.physicalAlbum.selected}
            onChange={handleChange}
          />
          <span>Include Physical Album with 20 photos</span>
        </label>
        <input
          type="number"
          name="number"
          data-category="giftImageSize"
          value={formData.giftImageSize.number}
          onChange={handleChange}
          placeholder="Gift Image Size (15x18 for guests)"
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="space-x-4 mt-4">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Photography;
