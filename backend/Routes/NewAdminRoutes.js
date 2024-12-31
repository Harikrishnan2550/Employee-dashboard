import express from "express";
import {
  newEmployee,
  upload,
  viewEmployeeById,
  editEmployeeById,
  getEmployeeById,
  updateLeaveStatus,
  sendNotification,
  getNotificationsByEmployeeId,
  getAllEmployees
} from "../controllers/NewAdminController.js";
import { authorizeRoles, authenticateUser } from "../middlewares/employeeMiddleware.js"; // Properly import both
import verifyToken from '../middlewares/tokenMiddleware.js'

const NewEmployeeRouter = express.Router();

// Apply authentication middleware globally
NewEmployeeRouter.use(authenticateUser); // Ensures all routes are protected

// Route for uploading a new employee (Admin and HR only)
NewEmployeeRouter.post(
  "/newemployee",
  upload.single("image"),
  authorizeRoles(["admin", "hr"]), // Only admin and HR can add new employees
  newEmployee,
  authenticateUser
);

// View employee details by ID (Admin, HR, and Employee)
NewEmployeeRouter.get(
  "/id/:id",
  authorizeRoles(["admin", "hr", "employee"]), // All roles can view employee details
  viewEmployeeById
);

// Edit employee details by ID (Admin and HR only)
NewEmployeeRouter.put(
  "/id/:id",
  authorizeRoles(["admin", "hr"]), // Only admin and HR can edit employee details
  editEmployeeById
);

// Search employee by employee_id (Admin, HR, and Employee)
NewEmployeeRouter.get(
  "/search/:employee_id",
  authorizeRoles(["admin", "hr", "employee"]), // All roles can search employee ID
  getEmployeeById
);

// Update leave status (Admin and HR only)
NewEmployeeRouter.post(
  "/leave/status",
  authorizeRoles(["admin", "hr"]), // Only admin and HR can update leave status
  updateLeaveStatus
);

// Send notification (Admin and HR only)
NewEmployeeRouter.post(
  "/notification",
  authorizeRoles(["admin", "hr"]), // Only admin and HR can send notifications
  sendNotification
);

// Get notifications for an employee by ID (All roles)
NewEmployeeRouter.get(
  "/notification/:employee_id",
  authorizeRoles(["admin", "hr", "employee"]), // All roles can view notifications
  getNotificationsByEmployeeId
);

// Get all employees (Admin and HR only)
NewEmployeeRouter.get(
  "/all-employees",
  authorizeRoles(["admin", "hr"]), // Only admin and HR can view all employees
  getAllEmployees,
  verifyToken
);

export default NewEmployeeRouter;
