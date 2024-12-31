import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = isLogin
      ? `http://localhost:4000/api/user/login`
      : `http://localhost:4000/api/user/signup`;

    const { name, email, password, role } = formData;
    const payload = isLogin ? { email, password } : { name, email, password, role };

    try {
      const response = await axios.post(endpoint, payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setIsAuthenticated(true);

      if (response.data.role === 'admin') {
        navigate('/admin/home');
      } else if (response.data.role === 'hr') {
        navigate('/hr/home');
      } else {
        navigate('/employee/home');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-600">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600`}
            >
              {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            <button onClick={toggleForm} className="text-blue-500 font-medium ml-2">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
