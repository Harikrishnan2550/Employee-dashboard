import Payroll from '../models/PayrollModel.js';
import newEmployeeModal from '../models/AddemployeeModal.js';
import Leave from '../models/LeaveModals.js';

// Function to calculate payroll
const calculatePayroll = async (employee_id) => {
  try {
    // Ensure employee_id is treated as a string (e.g., you can use String(employee_id) if needed)
    employee_id = String(employee_id);

    // Get the employee's details (now using employee_id as a string)
    const employee = await newEmployeeModal.findOne({ employee_id }); // Changed from `findById` to `findOne` since employee_id is now a string
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Get the number of approved leaves taken by the employee
    const leaves = await Leave.find({ employee_id, status: 'approved' });

    // Calculate salary and deductions
    const salary = employee.salary;
    let deductions = calculateDeductions(employee);

    // Calculate leave deductions (if any unpaid leave exists)
    let leaveDeductions = calculateLeaveDeductions(leaves);
    deductions += leaveDeductions;

    // Calculate net salary
    const netSalary = salary - deductions;

    // Generate payslip URL or filename (optional, for demo purposes we use a static string)
    const payslip = `https://your-server.com/payslips/${employee_id}_payslip.pdf`;

    // Save the payroll record with employee_name
    const payroll = new Payroll({
      employee_id,
      employee_name: employee.name, // Add employee_name
      salary,
      deductions,
      net_salary: netSalary,
      pay_date: new Date(),
      leave_deductions: leaveDeductions,
      payslip: payslip,
    });

    await payroll.save();

    return payroll;
  } catch (error) {
    console.error("Error calculating payroll:", error);
    throw error;
  }
};

// Functions for deduction calculations
const calculateDeductions = (employee) => {
  // Implement tax, insurance, etc.
  return 200; // Example deduction
};

const calculateLeaveDeductions = (leaves) => {
  // Deduct salary for unpaid leaves (e.g., $100 per day of unpaid leave)
  return leaves.length * 100; // Example: $100 deduction for each day of unpaid leave
};

export { calculatePayroll };
