import mongoose from "mongoose";

// Define the schema for the attendance
const AttendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the Employee model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clockIn: {
    type: Date, // Use Date type to store timestamp
    required: false,
  },
  clockOut: {
    type: Date, // Use Date type to store timestamp
    required: false,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "On Leave"],
    default: "Absent",
  },
  overtimeHours: {
    type: Number,
    default: 0,
  },
});

// Create the Attendance model
const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
