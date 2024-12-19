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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        numberOfPersons: Number(formData.numberOfPersons),
        userID: userId,
      };

      if (updatingGuestId) {
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

  const fetchGuests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/guests?userID=${userId}`
      );
      setGuestList(response.data);
    } catch (error) {
      console.error("Error fetching guests:", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guestList.slice(indexOfFirstGuest, indexOfLastGuest);
  const [updatingGuestId, setUpdatingGuestId] = useState(null);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalYesGuests = guestList.filter(
    (guest) => guest.answerStatus === "Yes"
  ).length;
  const totalNOGuests = guestList.filter(
    (guest) => guest.answerStatus === "No"
  ).length;
  const totalNotyetGuests = guestList.filter(
    (guest) => guest.answerStatus === "Not yet"
  ).length;

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
      setUpdatingGuestId(id);
    }
  };

  return (
    <div className="min-h-screen bg-BgCreme px-20 py-10">
      <div className="container mx-auto bg-BgGray shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-BgFont">Add your Guests here please!</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Guest Name"
              className="w-full px-4 py-2 border border-BgFont rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki focus:border-BgKhaki"
              required
            />
            <input
              type="number"
              name="numberOfPersons"
              value={formData.numberOfPersons}
              onChange={handleChange}
              placeholder="Number of Persons"
              className="w-full px-4 py-2 border border-BgFont rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki focus:border-BgKhaki"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-BgFont rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki focus:border-BgKhaki"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-2 border border-BgFont rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki focus:border-BgKhaki"
              required
            />
          </div>
          <textarea
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address of Guests"
              className="w-full px-4 py-2 border border-BgFont rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki focus:border-BgKhaki"
            required
          />
          <div className="flex items-center justify-between">
            <div className="w-full md:w-1/3">
              <label className="block text-gray-700 font-medium mb-2">Answer Status:</label>
              <select
                name="answerStatus"
                value={formData.answerStatus || ''}
                onChange={handleChange}
              className="w-full px-4 py-2 border border-BgFont rounded-lg focus:outline-none focus:ring focus:ring-BgKhaki focus:border-BgKhaki"
                required
              >
                <option value="Not yet">Not yet</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full md:w-1/2 bg-BgPinkMiddle text-BgFont font-bold py-4 px-4 rounded-lg hover:bg-BgPinkDark"
            >
              {updatingGuestId ? "Update Guest" : "Add Guest"}
            </button>
          </div>
        </form>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Guests with YES Answer: {totalYesGuests}
          </h3>
          <h3 className="text-lg font-semibold text-gray-700">
            Total Guests with NO Answer: {totalNOGuests}
          </h3>
          <h3 className="text-lg font-semibold text-gray-700">
            Total Guests with NOT YET Answer: {totalNotyetGuests}
          </h3>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full border border-BgFont text-BgFont bg-customBg rounded-lg">
  <thead>
    <tr className="bg-BgKhaki text-BgFont font-bold">
      <th className="px-4 py-3">Guest Name</th>
      <th className="px-4 py-3">Number</th>
      <th className="px-4 py-3">Phone</th>
      <th className="px-4 py-3">Address of Guests</th>
      <th className="px-4 py-3">Answer Status</th>
      <th className="px-4 py-3">Action</th>
    </tr>
  </thead>
  <tbody>
    {currentGuests.map((guest) => (
      <tr key={guest._id} className="hover:bg-gray-50 transition duration-200">
        <td className="border px-4 py-2">{guest.guestName}</td>
        <td className="border px-4 py-2">{guest.numberOfPersons}</td>
        <td className="border px-4 py-2">{guest.phone}</td>
        <td className="border px-4 py-2">{guest.address}</td>
        <td className="border px-4 py-2">{guest.answerStatus}</td>
        <td className="border px-4 py-2 flex gap-2">
          <button onClick={() => handleUpdate(guest._id)} 
          className="bg-BgPinkMiddle text-BgFont px-3 py-1 rounded hover:bg-BgPinkDark">
            Update
          </button>
          <button onClick={() => handleDelete(guest._id)}
          className="bg-BgPinkMiddle text-BgFont px-3 py-1 rounded hover:bg-BgPinkDark">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(guestList.length / guestsPerPage) }).map((_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded-lg ${
                index + 1 === currentPage
                  ? "bg-BgKhakiDark text-white"
                  : "bg-gray-200 text-gray-700"
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
