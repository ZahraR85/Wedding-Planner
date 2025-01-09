import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";const VenueForm = ({ onSubmit, venue, onCancel }) => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    capacity: "",
    price: "",
    discount: "",
    address: "",
    location: { x: "", y: "" },
    images: [],
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Redirect unauthorized users
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You are not authorized to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (venue) {
      setFormData({
        ...venue,
        location: {
          x: venue.latitude || "",
          y: venue.longitude || "",
        },
      });
      setExistingImages(venue.images || []); // Set existing images
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "x" || name === "y") {
      setFormData({
        ...formData,
        location: { ...formData.location, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles([...newImageFiles, ...files]);
  };

  const removeExistingImage = (index) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages);
  };

  const removeNewImage = (index) => {
    const updatedNewImages = newImageFiles.filter((_, i) => i !== index);
    setNewImageFiles(updatedNewImages);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Prepare form data
      const uploadFormData = new FormData();
      Array.from(newImageFiles).forEach((file) => uploadFormData.append("images", file));
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images") uploadFormData.append(key, value);
      });
      uploadFormData.append("userId", userId);
  
      // Upload to backend
      const response = await axios.post("http://localhost:3001/venues", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert(response.data.message || "Venue added successfully!");
      setFormData({
        name: "",
        city: "",
        capacity: "",
        price: "",
        discount: "",
        address: "",
        location: { x: "", y: "" },
        images: [],
        description: "",
      });
      setNewImageFiles([]);
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative min-h-screen bg-cover bg-center p-5 lg:p-20 bg-customBg1 lg:bg-[url('https://i.postimg.cc/Kv1WnL9Q/photography.png')]">
      {/* Overlay for controlling opacity */}
      <div className="absolute inset-0 bg-white/50 "></div>
      <div className="relative mx-auto w-full max-w-[calc(100%-10px)] lg:max-w-[calc(60%-100px)] bg-opacity-80 shadow-md rounded-lg p-5 space-y-4">
        <h1 className="text-xl lg:text-3xl font-bold m-5 text-center text-BgFont">
          {venue ? "Edit Venue" : "Add New Venue"}
        </h1>

        {/* Form fields */}
        <div className="flex">
      <div className="w-1/2 pr-8"><input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Venue Name"
          required
          className="input input-bordered w-full mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="input input-bordered w-full mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
        />
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          required
          className="input input-bordered w-full mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
        /></div> 
          <div className="w-1/2">  <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="input input-bordered w-full mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
        />
      <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="input input-bordered w-full mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
        />
      <div className="flex gap-2"> Location:
          <input
            type="number"
            name="x"
            value={formData.location.x}
            onChange={handleChange}
            placeholder="Latitude"
            required
            className="input input-bordered w-1/2 mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
          />
          <input
            type="number"
            name="y"
            value={formData.location.y}
            onChange={handleChange}
            placeholder="Longitude"
            required
            className="input input-bordered w-1/2 mb-2 border-BgPinkDark rounded focus:outline-none focus:ring focus:ring-BgPinkDark"
          /></div>
        </div>
        </div>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border mx-2 p-2 rounded w-full h-20 border-BgPinkDark focus:outline-none focus:ring focus:ring-BgPinkDark"
          rows={5}
          placeholder="address"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border mx-2 p-2 rounded w-full h-20 border-BgPinkDark focus:outline-none focus:ring focus:ring-BgPinkDark"
          rows={5}
          placeholder="Description"
        />

        {/* Existing Images */}
        <div>
          <h3 className="text-lg font-bold">Existing Images</h3>
          <div className="flex flex-wrap gap-2">
            {existingImages.length > 0 ? (
              existingImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img} // Make sure this is a valid image URL
                    alt="Venue"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-0 right-0 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No existing images found.</p>
            )}
          </div>

          {/* New Images */}
          <h3 className="text-lg font-bold mt-4">New Images</h3>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border mx-2 p-2 rounded w-full border-BgPinkDark focus:outline-none focus:ring focus:ring-BgPinkDark"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {newImageFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-0 right-0 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-BgPinkMiddle text-BgFont text-m lg:text-xl font-bold hover:bg-BgPinkDark hover:text-xl w-full p-4 rounded"
        >
          {venue ? "Update Venue" : "Add Venue"}
        </button>
        {venue && (
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 text-m lg:text-xl font-bold w-full p-4 mt-4 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default VenueForm;
