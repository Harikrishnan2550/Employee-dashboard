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

const NewEmployeeRouter = express.Router();

// Route for uploading a new employee
NewEmployeeRouter.post("/newemployee", upload.single("image"), newEmployee);

NewEmployeeRouter.get("/id/:id", viewEmployeeById);

NewEmployeeRouter.put("/id/:id", editEmployeeById);

NewEmployeeRouter.get("/search/:employee_id", getEmployeeById);

NewEmployeeRouter.post("/leave/status", updateLeaveStatus);

NewEmployeeRouter.post("/notification", sendNotification);

NewEmployeeRouter.get(
  "/notification/:employee_id",
  getNotificationsByEmployeeId
);

NewEmployeeRouter.get('/all-employees',getAllEmployees)



export default NewEmployeeRouter;

//675bfe31652248845bedfba3



 