import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoPeople } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

function Sidebar() {
  const userRole = localStorage.getItem("role"); // Assuming user role is stored in localStorage

  const getPanelName = () => {
    switch (userRole) {
      case "admin":
        return "Admin Panel";
      case "employee":
        return "Employee Panel";
      case "hr":
        return "HR Panel";
      default:
        return "Panel";
    }
  };

  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-gray-800 shadow-lg">
      <div className="flex flex-col gap-6 pt-8 text-sm text-gray-300">
        {/* Panel Name */}
        <h1 className="text-white text-2xl font-semibold text-center mb-8">
          {getPanelName()}
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          {userRole === "admin" && (
            <>
              <NavLink
                to="/employees"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <IoPeople className="text-xl" />
                Employees
              </NavLink>
              <NavLink
                to="/salary"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <HiOutlineBanknotes className="text-xl" />
                Salary
              </NavLink>
              <NavLink
                to="/manage-leaves"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <HiOutlineBanknotes className="text-xl" />
                Leave
              </NavLink>
              <NavLink
                to="/attendence"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <SlCalender className="text-xl" />
                Attendance
              </NavLink>
              <NavLink
                to="/sent-notification"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <SlCalender className="text-xl" />
                Notification
              </NavLink>
            </>
          )}

          {userRole === "hr" && (
            <>
              <NavLink
                to="/manage-leaves"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <SlCalender className="text-xl" />
                Leaves
              </NavLink>
              <NavLink
                to="/employees"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <IoPeople className="text-xl" />
                Employees
              </NavLink>
            </>
          )}

          {userRole === "employee" && (
            <>
              <NavLink
                to="/salary"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <HiOutlineBanknotes className="text-xl" />
                Salary
              </NavLink>
              <NavLink
                to="/employee/leaves"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <HiOutlineBanknotes className="text-xl" />
                Leaves
              </NavLink>
              <NavLink
                to="/employee/apply-leave"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <HiOutlineBanknotes className="text-xl" />
                Apply Leave
              </NavLink>
              <NavLink
                to="/employee/attendance"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <SlCalender className="text-xl" />
                Attendance
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
