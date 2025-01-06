import express from "express";
import { applyLeave, getLeaveRequests, updateLeaveStatus } from "../controllers/LeaveController.js"; // Import controller functions

const NewLeaveRouter = express.Router();

// Route to apply for leave
NewLeaveRouter.post("/leave", applyLeave);

// Route to get all leave requests (for admin or HR to view all requests)
NewLeaveRouter.get("/view-leave", getLeaveRequests);

// Route to update leave status (approve or reject)
NewLeaveRouter.post("/leave/status", updateLeaveStatus);

export default NewLeaveRouter;
