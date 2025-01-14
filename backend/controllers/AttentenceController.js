import Attendance from "../models/AttendenceModel.js";

// Clock-In Endpoint
export const clockIn = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const today = new Date().toISOString().split("T")[0];
    const existingAttendance = await Attendance.findOne({
      employee_id,
      date: { $gte: new Date(today) },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Already clocked in today" });
    }

    const newAttendance = new Attendance({
      employee_id,
      clockIn: new Date().toLocaleTimeString(),
      status: "Present",
    });

    await newAttendance.save();
    res.status(200).json({ message: "Clock-in successful", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Clock-Out Endpoint
export const clockOut = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const today = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.findOne({
      employee_id,
      date: { $gte: new Date(today) },
    });

    if (!attendance || attendance.clockOut) {
      return res.status(400).json({ message: "Cannot clock out, no clock-in record found" });
    }

    attendance.clockOut = new Date().toLocaleTimeString();
    const clockInTime = new Date(`1970-01-01T${attendance.clockIn}`);
    const clockOutTime = new Date(`1970-01-01T${attendance.clockOut}`);
    attendance.overtimeHours = (clockOutTime - clockInTime) / (1000 * 60 * 60);

    await attendance.save();
    res.status(200).json({ message: "Clock-out successful", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Attendance History for a Specific Employee
export const getAttendanceHistory = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const history = await Attendance.find({ employee_id }).sort({ date: -1 });

    res.status(200).json({ attendanceHistory: history });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Attendance Record
export const updateAttendance = async (req, res) => {
  try {
    const { _id } = req.params;
    const updates = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(_id, updates, { new: true });

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance updated successfully", attendance: updatedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get All Attendance History
export const getAllAttendanceHistory = async (req, res) => {
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
