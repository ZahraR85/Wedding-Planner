import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Guest() {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    guestName: '',
    numberOfPersons: '',
    phone: '',
    address: '',
    answerStatus: '',
    email: '',
  });

  const [guestList, setGuestList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guestsPerPage] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);
  console.log("User ID in Context:", userId);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Ensure numberOfPersons is sent as a number
  //     const requestData = {
  //       ...formData,
  //       numberOfPersons: Number(formData.numberOfPersons), // Convert to number
  //     };

  //     console.log('Request Data:', requestData); // Debugging
  //     const response = await axios.post('http://localhost:3001/guests', requestData);
  //     console.log('Response:', response.data);
  //     setGuestList([...guestList, response.data.feature]);
  //     setFormData({ guestName: '', numberOfPersons: '', phone: '', address: '' });
  //   } catch (error) {
  //     console.error('Error creating guest:', error.response ? error.response.data : error.message);
  //     alert('Failed to create guest. Please check the data and try again.');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        numberOfPersons: Number(formData.numberOfPersons),
        userID: userId,
      };
  
      if (updatingGuestId) {
        // Update operation
        const response = await axios.put(
          `http://localhost:3001/guests/${updatingGuestId}`,
          requestData
        );
        setGuestList(
          guestList.map((guest) =>
            guest._id === updatingGuestId ? response.data : guest
          )
        );
        setUpdatingGuestId(null);
        alert("Guest updated successfully!");
      } else {
        // Create operation
        const response = await axios.post(
          "http://localhost:3001/guests",
          requestData
        );
        setGuestList([...guestList, response.data.feature]);
        alert("Guest created successfully!");
      }
  
      setFormData({
        guestName: "",
        numberOfPersons: "",
        phone: "",
        address: "",
        answerStatus: "",
        email: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Failed to save guest.");
    }
  };
  

  // Fetch guests from the backend
  const fetchGuests = async () => {
    try {

      const response = await axios.get(`http://localhost:3001/guests?userID=${userId}`);
      setGuestList(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // Pagination logic
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guestList.slice(indexOfFirstGuest, indexOfLastGuest);
  const [updatingGuestId, setUpdatingGuestId] = useState(null);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Count guests with "Yes" answer status
  const totalYesGuests = guestList.filter((guest) => guest.answerStatus === 'Yes').length;
  const totalNOGuests = guestList.filter((guest) => guest.answerStatus === 'No').length;
  const totalNotyetGuests = guestList.filter((guest) => guest.answerStatus === 'Not yet').length;


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/guests/${id}`);
      setGuestList(guestList.filter((guest) => guest._id !== id));
      alert("Guest deleted successfully!");
    } catch (error) {
      console.error("Error deleting guest:", error.message);
      alert("Failed to delete guest.");
    }
  };

  const handleUpdate = (id) => {
    const guestToUpdate = guestList.find((guest) => guest._id === id);
    if (guestToUpdate) {
      setFormData({
        guestName: guestToUpdate.guestName,
        numberOfPersons: guestToUpdate.numberOfPersons,
        phone: guestToUpdate.phone,
        address: guestToUpdate.address,
        answerStatus: guestToUpdate.answerStatus,
        email: guestToUpdate.email,
      });
      setUpdatingGuestId(id); // Track which guest is being updated
    }
  };

  return (
    <div className=" min-h-screen bg-customBg px-20 py-10">
      <div className="container mx-auto p-6 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h1 className="text-3xl font-bold text-center text-BgFont mb-8">Guest Features</h1>
        {/* Form */}
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Guest Name"
              className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki"
              required
            />
            <input
              type="number"
              name="numberOfPersons"
              value={formData.numberOfPersons}
              onChange={handleChange}
              placeholder="Number of Persons"
              className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Email"
              className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki"
              required
            />
            <textarea
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki"
              required
            />
            <div className='flex'>
            <div className='w-1/2'>
            <label className="w-1/3 text-gray-700 font-medium">Answer Status:
            <select
              name="answerStatus"
              value={formData.answerStatus || ''}
              onChange={handleChange}
              className="w-2/3 m-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki"
              required
            >
              <option value="Not yet">Not yet</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            </label>
            </div>
          <button
            type="submit"
            className="w-1/2 pr-8 bg-BgPink text-BgFont text-lg font-bold py-2 rounded-lg hover:bg-BgPinkMiddle transition duration-200"
          >
            Submit
          </button>
          </div>
        </form>
        <div className="w-1/2 pr-8">
        {/* Statistics */}
        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Total Guests with YES Answer: {totalYesGuests}
        </h3>
        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Total Guests with NO Answer: {totalNOGuests}
        </h3>     <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Total Guests with NOT YET Answer: {totalNotyetGuests}
        </h3>
        </div>
        {/* Guest List */}
        <div className="mt-6">
          <table className="w-full table-auto border-collapse border border-focus:ring-BgKhaki">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Guest Name</th>
                <th className="border px-4 py-2 text-left">Number of Persons</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Answer Status</th>
              </tr>
            </thead>
            <tbody>
              {currentGuests.map((guest) => (
                <tr key={guest._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{guest.guestName}</td>
                  <td className="border px-4 py-2">{guest.numberOfPersons}</td>
                  <td className="border px-4 py-2">{guest.phone}</td>
                  <td className="border px-4 py-2">{guest.address}</td>
                  <td className="border px-4 py-2">{guest.answerStatus}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleUpdate(guest._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(guest._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(guestList.length / guestsPerPage) }).map((_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded-lg ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Guest;