import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Employees from '../components/Employees';
import Salary from '../components/Salary';
import Sidebar from '../components/Sidebar'
import ManageLeave from '../components/ManageLeave';

function HrDashBoard() {
  return (
    <div className="lg:flex bg-slate-200 min-h-screen">
      <Sidebar /> {/* Assuming Sidebar component is in place */}

      <div className="flex-1 p-4">
        <Routes>
          {/* Use relative paths here */}
          <Route path="home" element={<Home />} />
          <Route path="employees" element={<Employees />} />
          <Route path="manage-leaves" element={<ManageLeave/>} />
          <Route path="salary/:employee_id" element={<Salary />} />
        </Routes>
      </div>
    </div>
  );
}

export default HrDashBoard;