import express from "express";
import {
  sendNotification,
  getNotifications,
  markNotificationAsRead,
  // markAllNotificationsAsRead,
  // getUnreadNotifications,
} from "../controllers/NotificationController.js";
import authenticate from "../middlewares/NotificationAuthenticate.js"; // Use authenticate middleware

const notificationRouter = express.Router();

// Route to send a notification (for Admin only)
notificationRouter.post("/send", authenticate, sendNotification);

// Route to get all notifications for an employee
notificationRouter.get("/all-notifications", authenticate, getNotifications);

// Route to mark a notification as read
notificationRouter.put("/:notification_id/read", authenticate, markNotificationAsRead);

// Route to get unread notifications for an employee
// notificationRouter.get("/unread", authenticate, getUnreadNotifications);

export default notificationRouter;
