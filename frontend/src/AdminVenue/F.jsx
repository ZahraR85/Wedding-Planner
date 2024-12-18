import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const VenueForm = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    capacity: "",
    price: "",
    discount: "",
    address: "",
    location: { x: "", y: "" },
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch and verify user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: users } = await axios.get("http://localhost:3001/users");
        const user = users.find((u) => u._id === userId);

        if (user) {
          setUserRole(user.role);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch user role");
      }
    };

    if (userId) fetchUserRole();
  }, [userId]);

  // Fetch existing venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/venues");
        setVenues(data);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };

    fetchVenues();
  }, []);

  // Handle changes to form inputs
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

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = "http://localhost:3001/venues";
      const cleanedData = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
      };

      await axios.post(url, cleanedData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Venue saved successfully.");
      setFormData({
        name: "",
        city: "",
        capacity: "",
        price: "",
        discount: "",
        address: "",
        location: { x: "", y: "" },
        images: [],
      });
    } catch (err) {
      console.error("Error saving venue:", err);
      alert("Failed to save venue.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (userRole && userRole !== "Admin" && userRole !== "Manager") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-2xl font-bold mb-4">Venue Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
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
          />
          <input
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
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="input input-bordered w-full mb-2"
          />
          <div className="flex gap-2">
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
            />
          </div>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full mb-2"
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
          <button
            type="submit"
            className="bg-btnLight text-white hover:bg-btnDark w-full px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Venue"}
          </button>
        </form>
        {venues.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mt-6">Existing Venues</h2>
            <ul className="space-y-2">
              {venues.map((venue) => (
                <li key={venue.id} className="p-2 border rounded">
                  {venue.name} - {venue.city} (${venue.price})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueForm;