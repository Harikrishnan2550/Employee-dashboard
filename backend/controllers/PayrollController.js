import { calculatePayroll } from "../services/PayrollServices.js";
import Payroll from "../models/PayrollModel.js";

const generatePayroll = async (req, res) => {
    try {
      const { employee_id } = req.body; // Assuming employee_id is passed in the request body
  
      // Call the payroll calculation service
      const payroll = await calculatePayroll(employee_id);
  
      // Return the generated payroll data as response
      res.status(200).json({
        success: true,
        message: "Payroll generated successfully",
        payroll,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error generating payroll",
        error,
      });
    }
  };


// Controller to view payroll for an employee
const viewPayroll = async (req, res) => {
    try {
      const { employee_id } = req.params; // Get the employee_id from the route parameter
  
      // Fetch payroll data for the given employee ID
      const payroll = await Payroll.find({ employee_id }).sort({ pay_date: -1 }); // Sort by pay_date, latest first
  
      if (!payroll || payroll.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No payroll records found for the employee',
        });
      }
  
      // Send the payroll data as the response
      res.status(200).json({
        success: true,
        message: 'Payroll records fetched successfully',
        payroll,
      });
    } catch (error) {
      console.error('Error fetching payroll:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch payroll records',
        error,
      });
    }
  };

  export  { generatePayroll, viewPayroll };

  //http://localhost:4000/api/admin/generate  , generate payroll
  //http://localhost:4000/api/admin/view/:employee_id , view payroll