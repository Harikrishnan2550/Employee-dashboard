import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplyLeave() {
  const [employeeId, setEmployeeId] = useState(''); // For testing
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!employeeId || !leaveType || !fromDate || !toDate || !reason) {
        toast.error('All fields are required!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Send the leave request to the backend
      const response = await axios.post('http://localhost:4000/employee/leave', {
        employee_id: employeeId,
        leave_type: leaveType,
        start_date: fromDate,
        end_date: toDate,
        reason,
      });

      // Show success toast
      toast.success(response.data.message || 'Leave request submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the form fields
      setEmployeeId('');
      setLeaveType('');
      setFromDate('');
      setToDate('');
      setReason('');
    } catch (error) {
      // Handle errors
      const errorMessage =
        (error.response && error.response.data && error.response.data.message) ||
        'Failed to submit leave request.';

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <NavLink
        to={'/leaves'}
        className='py-1 px-4 ring-emerald-400 ring-1 rounded-lg shadow-lg absolute top-24 left-72 bg-white hover:bg-red-500 '>
        Back
      </NavLink>
      <form onSubmit={handleSubmit}>
        <div className='bg-white w-[1100px] h-[600px] ml-[90px] mt-24 shadow-2xl rounded-md'>
          <h1 className='ml-[450px] text-[20px] font-semibold py-10'>Request For Leave</h1>
          
          {/* Employee ID for Testing */}
          <label htmlFor="employeeId" className='ml-20 font-semibold'>Employee ID</label><br />
          <input
            id="employeeId"
            type="text"
            className='w-[900px] h-8 rounded-md mt-2 ml-20 ring-1 ring-emerald-400'
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)} /><br /><br />
          
          <label htmlFor="leaveType" className='ml-20 font-semibold'>Leave Type</label><br />
          <select
            id="leaveType"
            className='w-[900px] h-8 rounded-md mt-2 ml-20 ring-1 ring-emerald-400'
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}>
            <option value="">Select leave type</option>
            <option value="Sick leave">Sick leave</option>
            <option value="Casual leave">Casual leave</option>
            <option value="Annual leave">Annual leave</option>
          </select><br /><br />
          <div className='flex mr-40 justify-around'>
            <div>
              <label htmlFor="fromDate" className='font-semibold'>From Date</label><br />
              <input
                id="fromDate"
                type="date"
                className='w-[300px]  h-8 rounded-md mt-2 ring-1 ring-emerald-400'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="toDate" className='font-semibold'>To Date</label><br />
              <input
                id="toDate"
                type="date"
                className='w-[300px]  h-8 rounded-md mt-2 ring-1 ring-emerald-400'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div><br />
          <label htmlFor="reason" className='ml-20 font-semibold'>Reason</label><br />
          <input
            id="reason"
            type="text"
            className='w-[900px] h-8 rounded-md mt-2 ml-20 ring-1 ring-emerald-400'
            value={reason}
            onChange={(e) => setReason(e.target.value)} /><br /><br />
          <button
            type="submit"
            className='w-[900px] h-10 rounded-md mt-2 ml-20 ring-1 ring-emerald-400 bg-emerald-400 font-semibold'>
            Submit Leave Request
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ApplyLeave;
