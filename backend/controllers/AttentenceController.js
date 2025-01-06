// controllers/AttendanceController.js
import Attendance from '../models/AttendenceModel.js';

// Clock-In Endpoint
const clockIn = async (req, res) => {
  try {
    const { employee_id } = req.body;

    // Get today's date (in YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0];
    const existingAttendance = await Attendance.findOne({
      employee_id,
      date: { $gte: new Date(today) }, // Ensure only today's attendance is checked
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Already clocked in today' });
    }

    // Create a new attendance record with status 'Present'
    const newAttendance = new Attendance({
      employee_id,
      clockIn: new Date().toLocaleTimeString(),
      status: 'Present',
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Clock-in successful', attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Clock-Out Endpoint
const clockOut = async (req, res) => {
  try {
    const { employee_id } = req.body;

    // Get today's date (in YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({
      employee_id,
      date: { $gte: new Date(today) }, // Ensure only today's attendance is checked
    });

    if (!attendance || attendance.clockOut) {
      return res.status(400).json({ message: 'Cannot clock out, no clock-in record found' });
    }

    // Update the clock-out time
    attendance.clockOut = new Date().toLocaleTimeString();

    // Calculate overtime (for demonstration purposes, calculate difference in hours)
    const clockInTime = new Date(`1970-01-01T${attendance.clockIn}:00`);
    const clockOutTime = new Date(`1970-01-01T${attendance.clockOut}:00`);
    const overtime = (clockOutTime - clockInTime) / (1000 * 60 * 60); // in hours

    attendance.overtimeHours = overtime;

    await attendance.save();
    res.status(200).json({ message: 'Clock-out successful', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get Attendance History
const getAttendanceHistory = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const history = await Attendance.find({ employee_id }).sort({ date: -1 }); // Sort by date descending

    res.status(200).json({ attendanceHistory: history });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Attendance Record
const updateAttendance = async (req, res) => {
  try {
    const { _id } = req.params;
    const updates = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(_id, updates, {
      new: true, // Return the updated document
    });

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({
      message: 'Attendance updated successfully',
      attendance: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Controller to get all attendance history
const getAllAttendanceHistory = async (req, res) => {
  try {
    const attendanceHistory = await Attendance.find()
      .populate("employee_id", "name") // Populate the employee name
      .exec();

    if (!attendanceHistory || attendanceHistory.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    return res.json({ attendanceHistory });
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export { clockIn, clockOut, getAttendanceHistory, updateAttendance, getAllAttendanceHistory };
