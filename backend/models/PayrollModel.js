import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  employee_id: { type: String, required: true },  // Change ObjectId to String
  salary: { type: Number, required: true },  // Basic salary
  deductions: { type: Number, default: 0 },  // Deductions (e.g., taxes, benefits)
  net_salary: { type: Number, required: true }, // Net salary after deductions
  pay_date: { type: Date, default: Date.now }, // Date of salary payment
  leave_deductions: { type: Number, default: 0 }, // Deductions for unpaid leave
  payslip: { type: String, required: true },  // URL or path to the payslip file
});

const Payroll = mongoose.model('Payroll', payrollSchema);

export default Payroll;
