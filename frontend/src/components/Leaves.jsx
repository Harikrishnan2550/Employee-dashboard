import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaves() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all leave requests when the component mounts
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/leave"); // Adjust the API URL accordingly
        setLeaveRequests(response.data.leaveRequests);
      } catch (err) {
        setError("Failed to fetch leave requests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Leave Requests</h1>

      {leaveRequests.length === 0 ? (
        <p className="text-center text-gray-600">No leave requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border px-4 py-2">Employee ID</th>
                <th className="border px-4 py-2">Leave Type</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leaveRequest) => (
                <tr key={leaveRequest._id} className="bg-white hover:bg-gray-100">
                  <td className="border px-4 py-2">{leaveRequest.employee_id}</td>
                  <td className="border px-4 py-2">{leaveRequest.leave_type}</td>
                  <td className="border px-4 py-2">{new Date(leaveRequest.start_date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{new Date(leaveRequest.end_date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{leaveRequest.reason}</td>
                  <td className="border px-4 py-2">{leaveRequest.status}</td>
                  <td className="border px-4 py-2">
                    {leaveRequest.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(leaveRequest._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(leaveRequest._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">{leaveRequest.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Function to handle approval
  const handleApprove = async (leaveId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/leave/status", {
        leaveId,
        status: "Approved",
      });
      alert("Leave request approved");
      setLeaveRequests(leaveRequests.map(leaveRequest =>
        leaveRequest._id === leaveId ? { ...leaveRequest, status: "Approved" } : leaveRequest
      ));
    } catch (err) {
      alert("Error updating leave status");
    }
  };

  // Function to handle rejection
  const handleReject = async (leaveId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/leave/status", {
        leaveId,
        status: "Rejected",
      });
      alert("Leave request rejected");
      setLeaveRequests(leaveRequests.map(leaveRequest =>
        leaveRequest._id === leaveId ? { ...leaveRequest, status: "Rejected" } : leaveRequest
      ));
    } catch (err) {
      alert("Error updating leave status");
    }
  };
}

export default Leaves;
