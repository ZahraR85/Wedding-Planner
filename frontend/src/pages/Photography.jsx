import { useState } from "react";

const Photography = () => {
  const [formData, setFormData] = useState({
    userId: "",
    photography: "",
    videography: "",
    clipConstruction: "",
    physicalAlbum: false, // Boolean default value
    giftImageSize: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox
    }));
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
          userId: formData.userId,
          photography: "",
          videography: "",
          clipConstruction: "",
          physicalAlbum: false,
          giftImageSize: "",
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
          type="number"
          name="photography"
          value={formData.photography}
          onChange={handleChange}
          placeholder="Photography per 3 hours"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="videography"
          value={formData.videography}
          onChange={handleChange}
          placeholder="Videography per 3 hours"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="clipConstruction"
          value={formData.clipConstruction}
          onChange={handleChange}
          placeholder="Clip Construction per minute"
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="physicalAlbum"
            checked={formData.physicalAlbum}
            onChange={handleChange}
          />
          <span>Physical Album with 20 photos</span>
        </label>
        <input
          type="number"
          name="giftImageSize"
          value={formData.giftImageSize}
          onChange={handleChange}
          placeholder="Image size of 15x18 as gift for guests"
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
