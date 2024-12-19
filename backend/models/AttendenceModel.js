import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  employee_id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  clockIn: { type: String, required: false },
  clockOut: { type: String, required: false },
  status: {
    type: String,
    enum: ["Present", "Absent", "On Leave"],
    default: "Absent",
  },
  overtimeHours: { type: Number, default: 0 },
});

const attendence = mongoose.model("Attendence", AttendanceSchema);

export default attendence;
