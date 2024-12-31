import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { IoPeople } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';

function Sidebar() {
  const userRole = localStorage.getItem('role'); // Assuming user role is stored in localStorage

  const getPanelName = () => {
    switch (userRole) {
      case 'admin':
        return 'Admin Panel';
      case 'employee':
        return 'Employee Panel';
      case 'hr':
        return 'HR Panel';
      default:
        return 'Panel';
    }
  };

  return (
    <div className="w-[18%] lg:min-h-screen min-h-screen border-r-2 bg-gray-700 h-full">
      <div className="flex flex-col gap-6 pt-5 text-[15px] items-start ml-2">
        <h1 className="text-white text-xl font-bold ml-6">{getPanelName()}</h1>
        {/* Navigation links */}
        {userRole === 'admin' && (
          <>
            <NavLink to="employees" className="link-styles">
              <IoPeople className="mr-2 text-lg" />
              Employees
            </NavLink>
            <NavLink to="leaves" className="link-styles">
              <HiOutlineBanknotes className="mr-2 text-lg" />
              Salary
            </NavLink>
          </>
        )}
        {userRole === 'hr' && (
          <>
            <NavLink to="/leaves" className="link-styles">
              <SlCalender className="mr-2 text-lg" />
              Leaves
            </NavLink>
            <NavLink to="/employees" className="link-styles">
              <IoPeople className="mr-2 text-lg" />
              Employees
            </NavLink>
          </>
        )}
        {userRole === 'employee' && (
          <>
            <NavLink to="/salary" className="link-styles">
              <HiOutlineBanknotes className="mr-2 text-lg" />
              Salary
            </NavLink>
            <NavLink to="/attendance" className="link-styles">
              <SlCalender className="mr-2 text-lg" />
              Attendance
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
