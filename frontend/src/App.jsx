import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AdminDashBoard from './pages/AdminDashBoard.jsx';
import HrDashBoard from './pages/HrDashBoard.jsx';
import EmployeeDashboard from './pages/EmployeeDashBoard.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);

      if (storedRole === 'admin') {
        navigate('/admin');
      } else if (storedRole === 'hr') {
        navigate('/hr/home');
      } else if (storedRole === 'employee') {
        navigate('/employee/home');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} role={role} requiredRole="admin">
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} role={role} requiredRole="hr">
              <HrDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} role={role} requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route
          path="*"
          element={isAuthenticated ? <AdminDashBoard /> : <LoginSignup setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;
