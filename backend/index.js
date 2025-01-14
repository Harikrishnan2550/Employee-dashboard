// Import necessary modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/Mongodb.js";
import router from "./Routes/UserRoutes.js";
import NewEmployeeRouter from "./Routes/NewAdminRoutes.js";
import NewLeaveRouter from "./Routes/leaveRoutes.js";
import payrollrouter from "./Routes/PayrollRoutes.js";
import AttendenceRouter from "./Routes/AttendenceRoutes.js";
import morgan from "morgan"; // For logging HTTP requests
import notificationRouter from "./Routes/NotificationRoutes.js";

// Initialize Express
const app = express();
const port = process.env.PORT || 4000;

// Establish database connection
connectDb().catch((error) => {
  console.error("Failed to connect to MongoDB:", error.message);
  process.exit(1);
});

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests
app.use("/images", express.static("upload/images")); // Serve static image files

// Routes
app.use("/api/user", router); // User routes
app.use("/api/employee", NewEmployeeRouter); // Employee routes
app.use("/employee", NewLeaveRouter); // Leave management routes
app.use("/api/admin", payrollrouter); // Payroll management routes
app.use("/api", AttendenceRouter); // Attendance management routes
app.use("/api/notification", notificationRouter); // Notifications routes

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
