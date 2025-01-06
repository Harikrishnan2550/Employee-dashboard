import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeModal from './AddEmployeeModal';  // Import the modal

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

  if (loading) return <p className="text-center text-lg font-semibold">Loading employees...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Manage Employees</h1>

      {/* Display error message */}
      {error && <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>}

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search by Employee ID"
          className="h-10 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex items-center justify-center py-3 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          onClick={() => setModalOpen(true)}
        >
          <span className="mr-2">+</span> Add New Employee
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">DOB</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{employee.employee_id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={`http://localhost:4000/images/${employee.image}`}
                      alt={employee.name}
                      className="rounded-lg ring-1 ring-slate-300 h-12 w-12 object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{employee.name}</td>
                  <td className="px-4 py-3">{employee.dob}</td>
                  <td className="px-4 py-3">{employee.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-3 justify-center">
                      <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300">View</button>
                      <button className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300">Edit</button>
                      <button className="bg-yellow-500 text-white rounded-md px-4 py-2 hover:bg-yellow-600 transition duration-300">Salary</button>
                      <button className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-300">Leave</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Employees;
