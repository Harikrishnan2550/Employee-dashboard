import express from "express";
import {
  clockIn,
  clockOut,
  getAttendanceHistory,
  updateAttendance,
  getAllAttendanceHistory,
} from "../controllers/AttentenceController.js";

const AttendanceRouter = express.Router();

AttendanceRouter.post("/clock-in", clockIn);
AttendanceRouter.post("/clock-out", clockOut);
AttendanceRouter.get("/history/:employee_id", getAttendanceHistory);
AttendanceRouter.put("/update/:_id", updateAttendance);
AttendanceRouter.get("/attendence/all-history", getAllAttendanceHistory);

export default AttendanceRouter;
