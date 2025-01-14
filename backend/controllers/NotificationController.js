import Notification from "../models/NotificationModal.js";
import newEmployeeModal from "../models/AddemployeeModal.js";

// Controller to send a notification to an employee (for Admin only)
export const sendNotification = async (req, res) => {
  const { employeeId, message, type } = req.body;

  // Check if all required fields are provided
  if (!employeeId || !message || !type) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Find the employee by the employee_id (string) from the database
    const employee = await newEmployeeModal.findOne({ employee_id: employeeId });

    if (!employee) {
      return res.status(400).json({ success: false, message: "Employee not found" });
    }

    // Create a notification using the employee's _id (MongoDB ObjectId)
    const notification = new Notification({
      employee_id: employee._id, // Use employee's _id for MongoDB reference
      message,
      type,
    });

    // Save the notification to the database
    await notification.save();

    return res.status(200).json({ success: true, message: "Notification sent successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ success: false, message: "Failed to send notification" });
  }
};

// Controller to get all notifications for an employee
export const getNotifications = async (req, res) => {
  try {
    const { employee_id } = req.user; // Get employee_id from authenticated user
    const notifications = await Notification.find({ employee_id });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ success: false, message: "No notifications found" });
    }

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Failed to fetch notifications", error });
  }
};

// Controller to mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notification_id } = req.params; // Get notification ID from params

    // Find and update the notification to mark it as read
    const notification = await Notification.findByIdAndUpdate(
      notification_id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ success: false, message: "Failed to mark notification as read", error });
  }
};

// Controller to mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const { employee_id } = req.user; // Get employee_id from authenticated user

    // Update all unread notifications for the employee
    const updatedNotifications = await Notification.updateMany(
      { employee_id, read: false },
      { $set: { read: true } }
    );

    if (updatedNotifications.nModified === 0) {
      return res.status(404).json({ success: false, message: "No unread notifications found" });
    }

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ success: false, message: "Failed to mark notifications as read", error });
  }
};




//http://localhost:4000/api/send   sending notification