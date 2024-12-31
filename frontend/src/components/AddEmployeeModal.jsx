import React, { useState } from 'react';
import axios from 'axios';

function AddEmployeeModal({ isOpen, onClose }) {
  const defaultEmployeeState = {
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
  };

  const [newEmployee, setNewEmployee] = useState(defaultEmployeeState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState('');

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

    // Validate required fields
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      setNotification('Please fill out all required fields!');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    for (const key in newEmployee) {
      formData.append(key, newEmployee[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/employee/newemployee',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Employee added:', response.data);
      setNotification('Employee added successfully!');
      setNewEmployee(defaultEmployeeState); // Reset form
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding employee:', error);
      setNotification('Failed to add employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNewEmployee(defaultEmployeeState); // Reset form
    setNotification(''); // Clear notification
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] sm:w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        {notification && <p className="mb-4 text-center text-red-500">{notification}</p>}
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
            <select
              name="role"
              value={newEmployee.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {newEmployee.image && (
              <img
                src={URL.createObjectURL(newEmployee.image)}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded"
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
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
