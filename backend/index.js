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
import notificationRouter from "./Routes/NotificationRoutes.js";

// Initialize Express
const app = express();
const port = process.env.PORT || 4000;

// Database connection
connectDb().catch((error) => {
  console.error("Failed to connect to MongoDB:", error.message);
  process.exit(1);
});

// CORS Configuration
// const corsOptions = {
//   origin: ['http://localhost:4000', 'http://localhost:5173'], // Allow both origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // Allow cookies to be sent with requests
// };

// Middleware
app.use(express.json());
app.use(cors());  // Use CORS with the specified options
app.use(morgan('dev'));  // Log HTTP requests in the console
app.use("/images", express.static("upload/images"));  // Serve images from the 'upload/images' folder

// Routes
app.use("/api/user", router);
app.use("/api/employee", NewEmployeeRouter);
app.use("/employee", NewLeaveRouter);
app.use("/api/admin", payrollrouter);
app.use("/api/attendence", AttendenceRouter);
app.use('/api/notification',notificationRouter)

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
