import Leave from "../models/LeaveModals.js";

// Controller to apply for leave
export const applyLeave = async (req, res) => {
  try {
    const { employee_id, leave_type, start_date, end_date, reason } = req.body;

    // Validate the request body
    if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required" });
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
    res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
      leaveRequest: newLeaveRequest,
    });
  } catch (error) {
    console.error("Error applying leave:", error);
    res.status(500).json({ success: false, message: "Failed to apply for leave", error });
  }
};

// Controller to get all leave requests (admin/HR view)
export const getLeaveRequests = async (req, res) => {
  try {
    // Fetch all leave requests from the database
    const leaveRequests = await Leave.find();

    if (!leaveRequests || leaveRequests.length === 0) {
      return res.status(404).json({ success: false, message: "No leave requests found" });
    }

    res.status(200).json({ success: true, leaveRequests });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ success: false, message: "Failed to fetch leave requests", error });
  }
};

// Controller to update leave status (approve/reject)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    // Validate status value
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find and update the leave request status
    const leaveRequest = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });

    // If leave request not found
    if (!leaveRequest) {
      return res.status(404).json({ success: false, message: "Leave request not found" });
    }

    res.status(200).json({
      success: true,
      message: `Leave request ${status.toLowerCase()} successfully`,
      leaveRequest,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ success: false, message: "Failed to update leave status", error });
  }
};


export default applyLeave;


//http://localhost:4000/employee/leave
//http://localhost:4000/api/employee/leave/status