import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard,    } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoPeople } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

 
function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-700 h-screen'>
    <div className='flex flex-col gap-6 pt-5 text-[15px] items-start ml-2'>
        <NavLink className='flex items-start gap-3 px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[20px] ' to="/home">
            <h1><MdDashboard className='  text-white mt-1' /></h1>
             <p className='  hidden md:block text-white'> Dashboard</p>
        </NavLink>

        <NavLink className='flex items-start gap-3 px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' to="/employees">
             <h1><IoPeople className='text-white mt-1'/></h1>
             <p className='hidden md:block text-white'> Employees</p>
        </NavLink>

        <NavLink className='flex items-start gap-3  px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' to="/departments">
            <h1><FcDepartment className='text-white mt-1'/></h1>
            <p className='hidden md:block text-white'> Departments</p>
        </NavLink>

        <NavLink className='flex items-start gap-3  px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' to="/leaves">
            <h1><SlCalender className='text-white mt-1'/></h1>
            <p className='hidden md:block text-white'> Leaves</p>
        </NavLink>

        <NavLink className='flex items-start gap-3  px-10 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-[18px]' to="/salary">
            <h1><HiOutlineBanknotes className='text-white mt-1'/></h1>
            <p className='hidden md:block text-white'> Salary</p>
        </NavLink>
    </div>
</div>
  )
}

export default Sidebar
