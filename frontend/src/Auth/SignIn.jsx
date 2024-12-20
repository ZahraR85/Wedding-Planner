import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SignIn = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:3001/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setAuth(true, data.userId);
        navigate('/');
      } else {
        const message = await response.text();
        setError(message || 'Invalid login credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to sign in. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-2/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          name="identifier"
          placeholder="Name or Email"
          value={formData.identifier}
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
        <div className="w-full text-start underline hover:decoration-2">
          <Link to="/register" className="text-sm">Forgot your password?</Link>
        </div>
        <button
          onClick={handleSignIn}
          className="bg-BgPinkMiddle text-white py-2 text-lg hover:bg-BgPinkDark rounded w-full"
        >
          Sign In
        </button>
        <div className="m-5 w-full text-center underline hover:decoration-2">
          <Link to="/register" className="text-m">Create Account / Register</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
