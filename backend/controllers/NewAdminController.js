import multer from "multer";
import path from "path";
import newEmployeeModal from "../models/AddemployeeModal.js";
import bcrypt from "bcrypt";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images"); // Folder for storing uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}_${uniqueSuffix}`);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

// Controller for adding a new employee
const newEmployee = async (req, res) => {
  try {
    // Debug logs to check data
    console.log("Request Body:", req.body); // Form data
    console.log("Uploaded File:", req.file); // Image file data

    // Validate required fields
    const {
      name,
      email,
      employee_id,
      dob,
      gender,
      marital_status,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !employee_id ||
      !dob ||
      !gender ||
      !marital_status ||
      !designation ||
      !department ||
      !salary ||
      !password ||
      !role
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Ensure image is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee object
    const employee = new newEmployeeModal({
      name,
      email,
      employee_id,
      dob,
      gender,
      marital_status,
      designation,
      department,
      salary,
      password: hashedPassword, // Save the hashed password
      image: req.file.path, // Store file path from multer
      role,
    });

    // Save the employee to the database
    await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    console.error("Error adding new employee:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to add employee", error });
  }
};

// Controller for viewing employee details by ID
const viewEmployeeById = async (req, res) => {
  try {
    const { id } = req.params; // Get _id from route parameters

    // Validate the MongoDB _id format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee ID format" });
    }

    const employee = await newEmployeeModal.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee details",
      error,
    });
  }
};

//edit employee details

const editEmployeeById = async (req, res) => {
  try {
    const { id } = req.params; // Get _id from route parameters

    // Validate the MongoDB _id format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee ID format" });
    }

    // Find and update the employee with new data
    const updatedEmployee = await newEmployeeModal.findByIdAndUpdate(
      id,
      { ...req.body }, // Spread the new data from the request body
      { new: true, runValidators: true } // Return the updated document and run validations
    );

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
  } catch (error) {
    console.error("Error updating employee details:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update employee details",
        error,
      });
  }
};

//serach by employee_id

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.employee_id; // Get employee ID from the URL parameter

    // Find the employee in the database by employee_id
    const employee = await newEmployeeModal.findOne({
      employee_id: employeeId,
    });

    // If employee not found
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch employee details",
        error,
      });
  }
};

// Controller for HR/admin to accept or reject leave request

const updateLeaveStatus = async (req, res) => {
  try {
    const { leave_id, status, comment } = req.body;

    // Validate the request body
    if (!leave_id || !status || !["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid leave ID or status" });
    }

    // Find the leave request by ID
    const leaveRequest = await Leave.findById(leave_id);
    if (!leaveRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }

    // Find the employee who applied for leave
    const employee = await newEmployeeModal.findById(leaveRequest.employee_id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Update the leave request status
    leaveRequest.status = status;
    if (comment) {
      leaveRequest.comment = comment; // Optional: HR can add a comment for rejection or approval
    }

    // Save the updated leave request
    await leaveRequest.save();

    // // Create a notification for the employee
    const notificationMessage =
      status === "Approved"
        ? `Your leave request from ${leaveRequest.start_date} to ${leaveRequest.end_date} has been approved.`
        : `Your leave request from ${leaveRequest.start_date} to ${leaveRequest.end_date} has been rejected.`;

    const newNotification = new Notification({
      employee_id: leaveRequest.employee_id,
      message: notificationMessage,
      type: `Leave ${status}`,
    });

    // Save the notification
    await newNotification.save();

    res.status(200).json({
      success: true,
      message: `Leave request ${status}`,
      leaveRequest,
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update leave status",
        error,
      });
  }
};

//notification
const sendNotification = async (req, res) => {
  const { employee_id, message, type } = req.body;

  try {
    // Validate the input data
    if (!employee_id || !message || !type) {  // Ensure 'type' is included
      return res.status(400).json({ success: false, message: "Employee ID, message, and type are required" });
    }

    // Create a new notification
    const notification = new Notification({
      employee_id,
      message,
      type,
    });

    // Save the notification to the database
    await notification.save();

    // Send a response to the client
    res.status(201).json({ success: true, message: "Notification sent successfully", notification });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, message: "Failed to send notification", error });
  }
};
// Controller function to get notifications for a specific employee

const getNotificationsByEmployeeId = async (req, res) => {
  const { employee_id } = req.params;

  try {
    // Fetch notifications for the given employee_id
    const notifications = await Notification.find({ employee_id });

    if (notifications.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No notifications found for this employee",
        });
    }

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch notifications",
        error,
      });
  }
};


// Controller to get all employees
const getAllEmployees = async (req, res) => {
  try {
    // Add pagination options (optional, but useful for larger data sets)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const employees = await newEmployeeModal.find({}).skip(skip).limit(limit); // DB query with pagination

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }

    // Optionally, return pagination info in the response
    const totalEmployees = await newEmployeeModal.countDocuments();
    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      success: true,
      employees,
      totalEmployees,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error.message, // Detailed error message
    });
  }
};



// Export both the controller and upload middleware
export {
  newEmployee,
  upload,
  viewEmployeeById,
  editEmployeeById,
  getEmployeeById,
  updateLeaveStatus,
  sendNotification,
  getNotificationsByEmployeeId,
  getAllEmployees
 };

//http://localhost:4000/api/employee/newemployee ,to add new employee
//http://localhost:4000/api/employee/id/:id , to view employee
//http://localhost:4000/api/employee/id/:id , to edit employee
//http://localhost:4000/api/employee//search/:employee_id , to search by employee id
//http://localhost:4000/api/employee/leave/status , approval/reject for leave
//http://localhost:4000/api/employee/notification , sent notification
//http://localhost:4000/api/employee/notification/:employee_id, emplyee get notification
