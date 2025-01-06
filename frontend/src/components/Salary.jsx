import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Salary() {
  const [payrollData, setPayrollData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch payroll data for all employees on component mount
  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/view-all');
        
        if (response.data.success) {
          if (response.data.payrolls.length === 0) {
            setError('No payroll records available for any employee');
          } else {
            setPayrollData(response.data.payrolls); // Use 'payrolls' instead of 'payroll'
          }
        } else {
          setError(response.data.message || 'Error fetching payroll data');
        }
      } catch (err) {
        setError('Error fetching payroll data');
        console.error(err);
      }
    };

    fetchPayroll();
  }, []); // No need to depend on employee_id here

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Employee Payroll</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {payrollData.length === 0 ? (
        <p className="text-center">No payroll records available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Employee Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Pay Date</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Salary</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Deductions</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Leave Deductions</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Net Salary</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Payslip</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((payroll, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{payroll.employee_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{new Date(payroll.pay_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payroll.salary}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payroll.deductions}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payroll.leave_deductions}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payroll.net_salary}</td>
                  <td className="px-6 py-4 text-sm text-blue-500">
                    <a href={payroll.payslip} target="_blank" rel="noopener noreferrer">View Payslip</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Salary;
