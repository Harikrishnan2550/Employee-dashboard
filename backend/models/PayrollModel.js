import mongoose from "mongoose";


const payrollSchema = new mongoose.Schema({
  employee_id: { type: String, required: true },
  employee_name: { type: String, required: true }, // Add this field if required
  salary: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  net_salary: { type: Number, required: true },
  pay_date: { type: Date, default: Date.now },
  leave_deductions: { type: Number, default: 0 },
  payslip: { type: String, required: true },
});

const Payroll = mongoose.model('Payroll', payrollSchema);
export default Payroll;
