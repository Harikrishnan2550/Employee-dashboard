import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoPeople } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

function Sidebar() {
  const employeeId = 1; // You can dynamically fetch this ID based on your app's logic (for now using 1 as a placeholder)

  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-700 h-screen'>
      <div className='flex flex-col gap-6 pt-5 text-[15px] items-start ml-2'>
        {/* Dashboard Link */}
        <NavLink 
          to="/home" 
          className='flex items-start gap-3 px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[20px]'
          aria-label="Dashboard"
        >
          <h1><MdDashboard className='text-white mt-1' /></h1>
          <p className='hidden md:block text-white'>Dashboard</p>
        </NavLink>

        {/* Employees Link */}
        <NavLink 
          to="/employees" 
          className='flex items-start gap-3 px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' 
          aria-label="Employees"
        >
          <h1><IoPeople className='text-white mt-1' /></h1>
          <p className='hidden md:block text-white'>Employees</p>
        </NavLink>

        {/* Leaves Link */}
        <NavLink 
          to="/leaves" 
          className='flex items-start gap-3 px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' 
          aria-label="Leaves"
        >
          <h1><SlCalender className='text-white mt-1' /></h1>
          <p className='hidden md:block text-white'>Leaves</p>
        </NavLink>

        {/* Salary Link (use dynamic path) */}
        <NavLink 
          to={`/salary/${employeeId}`}  // Use dynamic path for salary page
          className='flex items-start gap-3 px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' 
          aria-label="Salary"
        >
          <h1><HiOutlineBanknotes className='text-white mt-1' /></h1>
          <p className='hidden md:block text-white'>Salary</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
