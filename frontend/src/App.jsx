import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashBoard from './pages/AdminDashBoard';
import LoginSignup from './components/LoginSignup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook to handle navigation

  // Check if the user is authenticated by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store token in localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar setIsAuthenticated={setIsAuthenticated} /> {/* Pass setIsAuthenticated for logout */}
        <Routes>
          <Route path="/" element={isAuthenticated ? <AdminDashBoard /> : <LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
          {/* Protected Route */}
          <Route path="/admin" element={isAuthenticated ? <AdminDashBoard /> : <LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
