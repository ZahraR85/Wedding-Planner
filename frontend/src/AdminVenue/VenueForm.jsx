import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const VenueForm = () => {
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
  const [venues, setVenues] = useState([]);

  // Redirect unauthorized users
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You are not authorized to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch all venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/venues`);
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "x" || name === "y") {
      setFormData({ ...formData, location: { ...formData.location, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // Submit new venue
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const requestData = { userId, ...formData };
      const response = await axios.post("http://localhost:3001/venues", requestData);
      alert(response.data.message || "Venue added successfully!");
      
      // Reset form for new entries
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

      // Update venue list
      setVenues((prevVenues) => [...prevVenues, response.data.venue]);
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Add Venue</h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Venue Name"
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            required
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="input input-bordered w-full"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              name="x"
              value={formData.location.x}
              onChange={handleChange}
              placeholder="Location X"
              className="input input-bordered w-1/2"
            />
            <input
              type="number"
              name="y"
              value={formData.location.y}
              onChange={handleChange}
              placeholder="Location Y"
              className="input input-bordered w-1/2"
            />
          </div>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="textarea textarea-bordered w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.images.map((img, index) => (
                <img key={index} src={img} alt="Preview" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Adding Venue..." : "Add Venue"}
          </button>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Existing Venues</h2>
        <ul>
          {venues.map((venue) => (
            <li key={venue._id} className="border p-2 rounded mb-2">
              <h3 className="font-bold">{venue.name}</h3>
              <p>City: {venue.city}</p>
              <p>Capacity: {venue.capacity}</p>
              <p>Price: ${venue.price} / day</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VenueForm;
