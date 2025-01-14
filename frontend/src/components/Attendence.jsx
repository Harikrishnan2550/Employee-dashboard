// components/Attendence.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendence = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all attendance records
    axios
      .get("http://localhost:4000/api/attendence/all-history")
      .then((response) => {
        console.log("Attendance History Response:", response);
        setAttendanceHistory(response.data.attendanceHistory);
      })
      .catch((error) => {
        console.error("Error fetching attendance history:", error.response || error);
        setError("Error fetching attendance history.");
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Attendance History</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-600">Employee Name</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600">Clock In</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600">Clock Out</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600">Overtime Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory.length > 0 ? (
              attendanceHistory.map((attendance) => (
                <tr key={attendance._id} className="border-t">
                  <td className="px-6 py-4">{attendance.employee_id.name}</td>
                  <td className="px-6 py-4">{attendance.clockIn}</td>
                  <td className="px-6 py-4">{attendance.clockOut}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        attendance.status === "Present"
                          ? "bg-green-100 text-green-600"
                          : attendance.status === "Absent"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      } px-2 py-1 rounded-full text-xs font-medium`}
                    >
                      {attendance.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{attendance.overtimeHours}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendence;
