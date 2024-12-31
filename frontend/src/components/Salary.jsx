import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Salary() {
  const { employee_id } = useParams(); // Get employee_id from the URL
  const [payrollData, setPayrollData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch payroll data for the employee on component mount
  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/view/${employee_id}`);
        
        if (response.data.success) {
          // Assuming the payroll data is in response.data.payroll
          if (response.data.payroll.length === 0) {
            setError('No payroll records available for this employee');
          } else {
            setPayrollData(response.data.payroll); 
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
  }, [employee_id]); // Re-fetch if employee_id changes

  return (
    <div>
      <h2>Employee Payroll</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {payrollData.length === 0 ? (
        <p>No payroll records available</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Pay Date</th>
              <th>Salary</th>
              <th>Deductions</th>
              <th>Leave Deductions</th>
              <th>Net Salary</th>
              <th>Payslip</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((payroll, index) => (
              <tr key={index}>
                <td>{new Date(payroll.pay_date).toLocaleDateString()}</td>
                <td>{payroll.salary}</td>
                <td>{payroll.deductions}</td>
                <td>{payroll.leave_deductions}</td>
                <td>{payroll.net_salary}</td>
                <td>
                  <a href={payroll.payslip} target="_blank" rel="noopener noreferrer">View Payslip</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Salary;
