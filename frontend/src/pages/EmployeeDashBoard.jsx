import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Employees from "../components/Employees";
import Salary from "../components/Salary";
import Sidebar from "../components/Sidebar";
import Leaves from "../components/Leaves";
import Attendence from "../components/Attendence";
import ApplyLeave from "../components/ApplyLeave";

function EmployeeDashboard() {
  return (
    <div className="lg:flex bg-slate-200 min-h-screen">
      <Sidebar /> {/* Assuming Sidebar component is in place */}
      <div className="flex-1 p-4">
        <Routes>
          {/* Use relative paths */}
          <Route path="home" element={<Home />} />
          <Route path="employees" element={<Employees />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="attendance" element={<Attendence />} />
          <Route path="salary/:employee_id" element={<Salary />} />
        </Routes>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
