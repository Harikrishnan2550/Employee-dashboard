import express from "express";
import {
  clockIn,
  clockOut,
  getAttendanceHistory,
  updateAttendance,
} from "../controllers/AttentenceController.js";

const AttendenceRouter = express.Router();

AttendenceRouter.post("/clock-in", clockIn);

AttendenceRouter.post("/clock-out", clockOut);

AttendenceRouter.get("/history/:employee_id", getAttendanceHistory);

AttendenceRouter.put("/update/:_id", updateAttendance);

export default AttendenceRouter;
