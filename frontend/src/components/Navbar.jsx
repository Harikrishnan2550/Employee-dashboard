import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Navbar({ setIsAuthenticated, userRole }) {
  const navigate = useNavigate(); // Hook to handle navigation

  // Logout function
  const handleLogout = () => {
    try {
      // Remove token from localStorage
      localStorage.removeItem('token');

      // Update authentication state
      setIsAuthenticated(false);

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Function to get the panel title based on user role
  const getPanelTitle = () => {
    switch (userRole) {
      case 'admin':
        return 'Admin Panel';
      case 'hr':
        return 'HR Panel';
      case 'employee':
        return 'Employee Panel';
      default:
        return 'Panel';
    }
  };

  // Function to get the logout button text based on user role
  const getLogoutButtonText = () => {
    switch (userRole) {
      case 'admin':
        return 'Logout (Admin)';
      case 'hr':
        return 'Logout (HR)';
      case 'employee':
        return 'Logout (Employee)';
      default:
        return 'Logout';
    }
  };

  return (
    <div className="bg-emerald-500 flex flex-col sm:flex-row justify-between w-full h-auto sm:h-16">
      {/* Panel Title */}
      <h1 className="p-5 font-bold text-[20px] ml-10 mb-2">{getPanelTitle()}</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout} // Call the handleLogout function when button is clicked
        className="h-10 mt-3 px-4 bg-emerald-700 rounded-xl text-white font-semibold text-[15px] mr-4"
        aria-label="Logout"
      >
        {getLogoutButtonText()}
      </button>
    </div>
  );
}

export default Navbar;
