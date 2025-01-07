import express from "express";
import { applyLeave, getLeaveRequests, updateLeaveStatus, getEmployeeLeaveHistory } from "../controllers/LeaveController.js";
import authenticate from "../middlewares/LeaveMiddleware.js";  // Use authenticate middleware

const NewLeaveRouter = express.Router();

// Route to apply for leave
NewLeaveRouter.post("/leave", authenticate, applyLeave);

// Route to get all leave requests (for admin or HR to view all requests)
NewLeaveRouter.get("/view-leave", authenticate, getLeaveRequests);

// Route to update leave status (approve or reject)
NewLeaveRouter.post("/leave/status", authenticate, updateLeaveStatus);

// Route to get leave history for a specific employee
NewLeaveRouter.get("/leave/history", authenticate, getEmployeeLeaveHistory); // This must match the URL on the front-end

export default NewLeaveRouter;
