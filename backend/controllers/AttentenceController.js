import attendence from "../models/AttendenceModel.js";

//clock in

const clockIn = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const today = new Date().toISOString().split("T")[0];
    const existingAttendance = await attendence.findOne({
        employee_id,
      date: { $gte: new Date(today) },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Already clocked in today" });
    }

    const newAttendance = new attendence({
        employee_id,
      clockIn: new Date().toLocaleTimeString(),
      status: "Present",
    });

    await newAttendance.save();
    res
      .status(200)
      .json({ message: "Clock-in successful", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//clock out

const clockOut = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const today = new Date().toISOString().split("T")[0];
    const attendance = await attendence.findOne({
        employee_id,
      date: { $gte: new Date(today) },
    });

    if (!attendance || attendance.clockOut) {
      return res
        .status(400)
        .json({ message: "Cannot clock out, no clock-in record found" });
    }

    attendance.clockOut = new Date().toLocaleTimeString();
    await attendance.save();

    res.status(200).json({ message: "Clock-out successful", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//get attendence history

const getAttendanceHistory = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const history = await attendence.find({ employee_id }).sort({ date: -1 });

    res.status(200).json({ attendanceHistory: history });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//update attendence

const updateAttendance = async (req, res) => {
  try {
    const { _id } = req.params;
    const updates = req.body;

    const updatedAttendance = await attendence.findByIdAndUpdate(_id, updates, {
      new: true,
    });

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res
      .status(200)
      .json({
        message: "Attendance updated successfully",
        attendance: updatedAttendance,
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export { clockIn, clockOut, getAttendanceHistory, updateAttendance };



//http://localhost:4000/api/attendence/history/:employee_id , to get history of attendence,
//http://localhost:4000/api/attendence/update/:_id , to update attendence,
//http://localhost:4000/api/attendence/clock-in , to add clockin  attendence,
//http://localhost:4000/api/attendence/clock-out, to add clockout attendence
 