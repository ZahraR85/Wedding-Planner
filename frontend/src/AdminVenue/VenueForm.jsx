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
  /*const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };
  */
// Update the handleImageUpload function to accept URLs directly
const handleImageUpload = (e) => {
  const { value } = e.target;
  const urls = value.split(',').map((url) => url.trim()); // Split by comma and trim whitespace
  setFormData({ ...formData, images: [...formData.images, ...urls] });
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
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
    <div className="w-{95%} p-8 bg-customBg1 shadow-lg rounded-lg space-y-5 ">
    <div className="flex">
      <div className="w-1/2 pr-8"><input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Venue Name"
          required
          className="input input-bordered w-full mb-2"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="input input-bordered w-full mb-2"
        />
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          required
          className="input input-bordered w-full mb-2"
        /></div> 
          <div className="w-1/2">  <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="input input-bordered w-full mb-2"
        />
      <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="input input-bordered w-full mb-2"
        />
      <div className="flex gap-2"> Location:
          <input
            type="number"
            name="x"
            value={formData.location.x}
            onChange={handleChange}
            placeholder="Location X"
            required
            className="input input-bordered w-1/2 mb-2"
          />
          <input
            type="number"
            name="y"
            value={formData.location.y}
            onChange={handleChange}
            placeholder="Location Y"
            required
            className="input input-bordered w-1/2 mb-2"
          /></div>
        </div>
        </div>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border mx-2 p-2 rounded w-full h-20"
          rows={5}
          placeholder="address"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border mx-2 p-2 rounded w-full h-20"
          rows={5}
          placeholder="Description"
        />
        <div className="flex">
        <div className="w-1/2 pr-8">
  <textarea
    placeholder="Enter image URLs, separated by commas"
    onChange={handleImageUpload}
    className="textarea textarea-bordered w-full mb-2"
  />
  {formData.images.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {formData.images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Uploaded"
          className="w-16 h-16 object-cover rounded"
        />
      ))}
    </div>
        )}
        </div>
        <span className="text-xl font-bold mr-20">total price: $</span>
      <button
        onClick={handleSubmit}
        className="bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark w-1/3 px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Add Venue"}
      </button>
      </div>
      <h2 className="text-lg font-bold mt-5">List of our Venues</h2>
      <ul className="space-y-3">
{venues.map((venue, index) => (
  <li key={index} className="border p-4 rounded">
    <h3 className="font-bold">{venue.name}</h3>
    <p>Location: {venue.location.x}, {venue.location.y}</p> 
    <p>Capacity: {venue.capacity}</p>
    <p>Price: ${venue.price}/day</p>
    <p>{venue.description}</p>
  </li>
))}
</ul>

    </div>
  </div>
);
};

export default VenueForm;
