// Import necessary modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/Mongodb.js";
import router from './Routes/UserRoutes.js';
import NewEmployeeRouter from "./Routes/NewAdminRoutes.js";
import NewLeaveRouter from "./Routes/leaveRoutes.js";
import payrollrouter from "./Routes/PayrollRoutes.js";
import AttendenceRouter from "./Routes/AttendenceRoutes.js";
import morgan from 'morgan';  // For logging HTTP requests

// Initialize Express
const app = express();
const port = process.env.PORT || 4000;

// Database connection
connectDb().catch((error) => {
  console.error("Failed to connect to MongoDB:", error.message);
  process.exit(1);
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));  // Log HTTP requests in the console
app.use("/images", express.static("upload/images"));

// Routes
app.use("/api/user", router);
app.use("/api/employee", NewEmployeeRouter);
app.use("/employee", NewLeaveRouter);
app.use("/api/admin", payrollrouter);
app.use("/api/attendence", AttendenceRouter);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware for any unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
