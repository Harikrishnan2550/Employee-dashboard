import Leave from "../models/LeaveModals.js";
import newEmployeeModal from "../models/AddemployeeModal.js";

// Controller for applying for leave
const applyLeave = async (req, res) => {
  try {
    const { employee_id, leave_type, start_date, end_date, reason } = req.body;

    // Validate the request body
    if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the employee exists
    const employee = await newEmployeeModal.findOne({ employee_id }); // Adjusted to check by employee_id (string)
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Create a new leave request
    const newLeaveRequest = new Leave({
      employee_id,
      leave_type,
      start_date,
      end_date,
      reason,
    });

    // Save the leave request to the database
    await newLeaveRequest.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Leave request submitted successfully",
        leaveRequest: newLeaveRequest,
      });
  } catch (error) {
    console.error("Error applying leave:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to apply for leave", error });
  }
};

export default applyLeave;


//http://localhost:4000/employee/leave
//http://localhost:4000/api/employee/leave/status