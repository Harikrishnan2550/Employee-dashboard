import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for routing
import axios from "axios";

function Leaves() {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get("http://localhost:4000/employee/leave/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLeaveHistory(response.data.leaveHistory || []); // Update leaveHistory
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch leave history");
        console.error("Error fetching leave history:", err.response?.data || err.message);

        // Handle unauthorized access (optional)
        if (err.response?.status === 401) {
          localStorage.removeItem("token"); // Clear token if unauthorized
          window.location.href = "/login"; // Redirect to login page
        }
      } finally {
        setLoading(false); // Ensure loading state is cleared
      }
    };

    fetchLeaveHistory();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-emerald-500 mb-6">Leave History</h1>

        {/* Apply Leave Button */}
        {/* <div className="text-right mb-4">
          <NavLink
            to="/apply-leave" // Adjust the route based on your setup
            className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition"
          >
            Apply Leave
          </NavLink>
        </div> */}

        {/* Leave History Table */}
        {leaveHistory.length === 0 ? (
          <p className="text-center text-gray-500">No leave history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-emerald-400 text-white">
                <tr>
                  <th className="py-2 px-4 border">Leave Type</th>
                  <th className="py-2 px-4 border">From Date</th>
                  <th className="py-2 px-4 border">To Date</th>
                  <th className="py-2 px-4 border">Reason</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition`}
                  >
                    <td className="py-2 px-4 border text-center">{leave.leave_type}</td>
                    <td className="py-2 px-4 border text-center">
                      {leave.start_date ? new Date(leave.start_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {leave.end_date ? new Date(leave.end_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">{leave.reason}</td>
                    <td className="py-2 px-4 border text-center">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaves;
