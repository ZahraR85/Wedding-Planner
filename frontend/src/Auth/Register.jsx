import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Registration successful. You can now sign in.');
        setError('');
      } else {
        const message = await response.text();
        setError(message || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-2/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <input
        type="text"
        name="name"
        placeholder="First Name"
        value={formData.name}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="family"
        placeholder="Last Name"
        value={formData.family}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <button onClick={handleRegister}
      className="bg-btnLight text-white py-2 text-lg hover:bg-btnDark rounded w-full"
      >Register</button>
    </div>
    </div>
  );
};

export default Register;
