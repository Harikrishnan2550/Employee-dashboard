import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeModal from './AddEmployeeModal';  // Import the modal
// import decode from 'jwt-decode';  // Importing jwt-decode correctly

function Employees() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);  // New loading state
  const [error, setError] = useState(null);  // New error state

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);  // Start loading
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        // Decode the token to check for validity (optional)
        // const decodedToken = decode(token);
        // console.log(decodedToken); // Log the decoded token to verify

        const response = await axios.get("http://localhost:4000/api/employee/all-employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.data.success) {
          setDetails(response.data.employees);
        } else {
          setError("Error fetching employees.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = details.filter((employee) =>
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading employees...</p>;

  return (
    <div className='p-5'>
      <h1 className='font-bold text-[22px]'>Manage Employees</h1>

      {/* Display error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

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

      <div className='max-h-[87vh] overflow-auto px-4 text-center mt-4'>
        <table className="min-w-full">
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
              filteredEmployees.map((employee, index) => (
                <tr key={index} className="border-b">
                  <td>{employee.employee_id}</td>
                  <td>
                    <img
                      src={`http://localhost:4000/images/${employee.image}`}
                      alt={employee.name}
                      className="rounded-lg ring-1 ring-slate-900/5 my-1 h-[50px] w-[80px]"
                    />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.department}</td>
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

      <AddEmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Employees;
