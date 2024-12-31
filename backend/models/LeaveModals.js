import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee_id: {
    type: String, // Change from ObjectId to String
    required: true,
  },
  leave_type: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Leave status can be Pending, Approved, or Rejected
  applied_on: { type: Date, default: Date.now },
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
