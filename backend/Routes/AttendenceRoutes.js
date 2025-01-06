// routes/AttendanceRouter.js
import express from "express";
import {
  clockIn,
  clockOut,
  getAttendanceHistory,
  updateAttendance,
  getAllAttendanceHistory,
} from "../controllers/AttentenceController.js"; // Corrected typo here

const AttendanceRouter = express.Router();

AttendanceRouter.post("/clock-in", clockIn);

AttendanceRouter.post("/clock-out", clockOut);

AttendanceRouter.get("/history/:employee_id", getAttendanceHistory);

AttendanceRouter.put("/update/:_id", updateAttendance);

AttendanceRouter.get("/all-history", getAllAttendanceHistory);


export default AttendanceRouter;
