import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeModal from './AddEmployeeModal';  // Import the modal

function Employees() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Assuming you have the token stored in localStorage or context
        const token = localStorage.getItem('token'); // or from context
        const response = await axios.get("http://localhost:4000/api/employee/all-employees", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in Authorization header
          }
        });
        
        console.log(response.data);
        if (response.data.success) {
          setDetails(response.data.employees); // Set the employees in state
        } else {
          console.error("Error fetching employees:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
  
    fetchEmployees();
  }, []);
  
  

  // Filter employees based on search term (Employee ID)
  const filteredEmployees = details.filter((employee) =>
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const token = localStorage.getItem('token');
console.log(token); // Check if the token is retrieved correctly

  return (
    <div className='p-5'>
      <h1 className='font-bold text-[22px]'>Manage Employees</h1>
      <div className='flex justify-between'>
        <input
          type="text"
          placeholder='Search by Employee ID'
          className='h-8 px-2 mt-10 rounded-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className='flex py-1 w-[210px] bg-emerald-500 rounded-lg font-semibold mt-10'
          onClick={() => setModalOpen(true)}
        >
          <span className='ml-7 text-white'>Add New Employee</span>
        </button>
      </div>

      {/* Employees Table */}
      <div className='max-h-[87vh] overflow-auto px-4 text-center mt-4'>
        <table className="w-[1200px]">
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
  {filteredEmployees.length > 0 ? (
    filteredEmployees.map((employe, index) => (
      <tr key={index}>
        <td>{employe.employee_id}</td>
        <td>
          <img
            src={`http://localhost:4000/upload/images/${employe.image}`} // Assuming the server serves images from this path
            alt={employe.name}
            className="rounded-lg ring-1 ring-slate-900/5 my-1 h-[50px] w-[80px]"
          />
        </td>
        <td>{employe.name}</td>
        <td>{employe.dob}</td>
        <td>{employe.department}</td>
        <td>
          <div className='space-x-5'>
            <button className='bg-blue-500 ring-blue-200 rounded-md px-3 py-1'>View</button>
            <button className='bg-green-500 ring-green-200 rounded-md px-3 py-1'>Edit</button>
            <button className='bg-yellow-500 ring-yellow-200 rounded-md px-3 py-1'>Salary</button>
            <button className='bg-red-500 ring-red-200 rounded-md px-3 py-1'>Leave</button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No employees found</td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* Include the Modal here */}
      <AddEmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Employees;
