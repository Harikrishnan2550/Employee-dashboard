import express from "express";
import applyLeave from "../controllers/LeaveController.js";

const NewLeaveRouter = express.Router();

NewLeaveRouter.post("/leave", applyLeave);

export default NewLeaveRouter;
