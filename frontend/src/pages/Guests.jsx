import { useState, useEffect } from 'react';
import axios from 'axios';

function Guest() {
  const [formData, setFormData] = useState({
    guestName: '',
    numberOfPersons: '',
    phone: '',
    address: '',
  });

  const [guestList, setGuestList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guestsPerPage] = useState(2);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure numberOfPersons is sent as a number
      const requestData = {
        ...formData,
        numberOfPersons: Number(formData.numberOfPersons), // Convert to number
      };
  
      console.log('Request Data:', requestData); // Debugging
      const response = await axios.post('http://localhost:3001/guests', requestData);
      console.log('Response:', response.data);
      setGuestList([...guestList, response.data.feature]);
      setFormData({ guestName: '', numberOfPersons: '', phone: '', address: '' });
    } catch (error) {
      console.error('Error creating guest:', error.response ? error.response.data : error.message);
      alert('Failed to create guest. Please check the data and try again.');
    }
  };

  // Fetch guests from the backend
  const fetchGuests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/guests');
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Count guests with "Yes" answer status
  const totalYesGuests = guestList.filter((guest) => guest.answerStatus === 'Yes').length;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Guest Features</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Number of Persons</label>
            <input
              type="number"
              name="numberOfPersons"
              value={formData.numberOfPersons}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>

        {/* Statistics */}
        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Total Guests with "Yes" Answer: {totalYesGuests}
        </h3>

        {/* Guest List */}
        <div className="mt-6">
          <table className="w-full table-auto border-collapse border border-gray-200">
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
              className={`px-3 py-1 rounded-lg ${
                index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
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