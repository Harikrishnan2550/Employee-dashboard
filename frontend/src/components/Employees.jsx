import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import assets from '../assets/Data';


function Employees() {
  const[details,setDetails]=useState([])
  return (
    <div className='p-5'>
      <h1 className='font-bold text-[22px]'>Manage Employees</h1>
      <button className='flex py-1 w-[210px] bg-emerald-500 rounded-lg font-semibold mt-10'><span className='ml-7 text-white'> Add New Employee</span></button>
        <div className='max-h-[87vh] overflow-auto px-4 text-center mt-4'>
          <table className="w-[1000px] ">
            <thead>
              <tr className="font-semibold text-start py-12">
                <th className="p-2">S.No</th>
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Department</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
                  {assets.map((show,index)=>(
                    <tr key={index} className=''>
                          <td>{show.id}</td>
                          <td><img src={show.image} alt="" className="rounded-lg ring-1 ring-slate-900/5 my-1 h-[50px] w-[80px]" /></td>
                          <td>{show.name}</td>
                          <td>{show.dob}</td>
                          <td>{show.department}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Employees
