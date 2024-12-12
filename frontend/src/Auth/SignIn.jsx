import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        const message = await response.text();
        setError(message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
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
          placeholder="Username or Email"
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
        <div className='w-full text-start underline hover:decoration-2'>
          <Link to="/register" className="btn btn-primary text-sm">Forgot your password?</Link>
        </div>
        <button
          onClick={handleSignIn}
          className="bg-btnLight text-white py-2 text-lg hover:bg-btnDark rounded w-full"
        >
          Sign In
        </button>
        <div className="m-5 w-full text-center underline hover:decoration-2">
          <Link to="/register" className="btn btn-primary text-m">Create account / Register</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
