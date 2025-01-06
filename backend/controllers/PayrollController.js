import { calculatePayroll } from "../services/PayrollServices.js";
import Payroll from "../models/PayrollModel.js";
import newEmployeeModal from '../models/AddemployeeModal.js'

// Controller to generate payroll for an employee
const generatePayroll = async (req, res) => {
  try {
    const { employee_id } = req.body; // Assuming employee_id is passed in the request body (string format)
    
    if (!employee_id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Call the payroll calculation service
    const payroll = await calculatePayroll(employee_id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll calculation failed or employee not found",
      });
    }

    // Return the generated payroll data as response
    res.status(200).json({
      success: true,
      message: "Payroll generated successfully",
      payroll,
    });
  } catch (error) {
    console.error("Error generating payroll:", error);
    res.status(500).json({
      success: false,
      message: "Error generating payroll",
      error: error.message || error,
    });
  }
};

// Controller to view payroll for an employee
const viewPayroll = async (req, res) => {
  try {
    const { employee_id } = req.params; // Get the employee_id from the route parameter (string format)

    if (!employee_id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Fetch payroll data for the given employee ID
    const payroll = await Payroll.find({ employee_id }).sort({ pay_date: -1 });

    if (!payroll || payroll.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payroll records found for the employee",
      });
    }

    // Fetch the employee name from the Employee model
    const employee = await Employee.findOne({ employee_id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Send the payroll data along with the employee name
    res.status(200).json({
      success: true,
      message: "Payroll records fetched successfully",
      employee_name: employee.name,
      payroll,
    });
  } catch (error) {
    console.error("Error fetching payroll:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payroll records",
      error: error.message || error,
    });
  }
};

// Controller to view payroll for all employees
const viewAllPayrolls = async (req, res) => {
  try {
    // Fetch all payroll records
    const payrolls = await Payroll.find().sort({ pay_date: -1 }); // Sort by pay_date, latest first

    if (!payrolls || payrolls.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No payroll records found',
      });
    }

    // Fetch employee names and add them to the payroll records
    const payrollWithNames = await Promise.all(
      payrolls.map(async (payroll) => {
        const employee = await newEmployeeModal.findOne({ employee_id: payroll.employee_id });
        if (employee) {
          payroll.employee_name = employee.name; // Add employee name to payroll
        }
        return payroll;
      })
    );

    // Send the payroll records with employee names as the response
    res.status(200).json({
      success: true,
      message: 'Payroll records for all employees fetched successfully',
      payrolls: payrollWithNames,
    });
  } catch (error) {
    console.error('Error fetching all payroll records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all payroll records',
      error: error.message || error,
    });
  }
};
export { generatePayroll, viewPayroll,viewAllPayrolls };

  //http://localhost:4000/api/admin/generate  , generate payroll
  //http://localhost:4000/api/admin/view/:employee_id, view payroll