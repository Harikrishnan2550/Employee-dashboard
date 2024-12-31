import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';
import Employees from '../components/Employees';
import Leaves from '../components/Leaves';
import Salary from '../components/Salary';
import ApplyLeave from '../components/ApplyLeave';
// import AddNewEmployee from '../components/AddNewEmployee';

function AdminDashBoard() {
  return (
    <div className="lg:flex bg-slate-200 min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/leaves' element={<Leaves />} />
          <Route path='/salary/:employee_id' element={<Salary />} />
          {/* <Route path='/add_employee' element={<AddNewEmployee />} /> */}
          <Route path='/apply-leave' element={<ApplyLeave />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashBoard;
