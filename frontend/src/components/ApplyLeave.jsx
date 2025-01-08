import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assuming employeeId comes from authentication context/session
  const employeeId = localStorage.getItem('employeeId') || 'EMP123'; // Replace this with dynamic retrieval logic.

  const validateForm = () => {
    if (!leaveType || !fromDate || !toDate || !reason) {
      toast.error('All fields are required!', { position: 'top-right', autoClose: 3000 });
      return false;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      toast.error('Invalid date range: "From Date" cannot be after "To Date".', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (!token) {
        toast.error('Authentication token is missing. Please log in again.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
  
      const response = await axios.post(
        'http://localhost:4000/employee/leave',
        {
          employee_id: employeeId,
          leave_type: leaveType,
          start_date: fromDate,
          end_date: toDate,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
  
      toast.success(response.data.message || 'Leave request submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
  
      // Reset the form
      resetForm();
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.message) ||
        'Failed to submit leave request.';
      toast.error(errorMessage, { position: 'top-right', autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const resetForm = () => {
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setReason('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-emerald-500">
          Request Leave
        </h1>

        {/* Leave Type */}
        <div>
          <label htmlFor="leaveType" className="block font-medium">
            Leave Type
          </label>
          <select
            id="leaveType"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select leave type</option>
            <option value="Sick leave">Sick leave</option>
            <option value="Casual leave">Casual leave</option>
            <option value="Annual leave">Annual leave</option>
          </select>
        </div>

        {/* Dates */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="fromDate" className="block font-medium">
              From Date
            </label>
            <input
              id="fromDate"
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="toDate" className="block font-medium">
              To Date
            </label>
            <input
              id="toDate"
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block font-medium">
            Reason
          </label>
          <textarea
            id="reason"
            rows="3"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md font-bold text-white ${
            isSubmitting ? 'bg-emerald-300' : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default ApplyLeave;
