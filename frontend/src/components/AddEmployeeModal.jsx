import React, { useState } from 'react';
import axios from 'axios';

function AddEmployeeModal({ isOpen, onClose }) {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    employee_id: '',
    dob: '',
    gender: '',
    marital_status: '',
    designation: '',
    department: '',
    salary: '',
    password: '',
    role: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);  // To track form submission state

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!newEmployee.name || !newEmployee.email || !newEmployee.employee_id || !newEmployee.dob) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);  // Disable button while submitting

    const formData = new FormData();
    for (const key in newEmployee) {
      formData.append(key, newEmployee[key]);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/employee/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Employee added:', response.data);
      setIsSubmitting(false);  // Reset button state
      onClose();  // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding employee:", error);
      setIsSubmitting(false);  // Reset button state on error
    }
  };

  if (!isOpen) return null;  // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={newEmployee.employee_id}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={newEmployee.dob}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Gender</label>
            <select
              name="gender"
              value={newEmployee.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Marital Status</label>
            <select
              name="marital_status"
              value={newEmployee.marital_status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={newEmployee.designation}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={newEmployee.salary}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={newEmployee.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={newEmployee.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}  // Ensure that the modal closes on this button click
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
