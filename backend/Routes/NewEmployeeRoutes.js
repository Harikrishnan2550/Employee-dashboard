import express from 'express';
import { newEmployee, upload } from '../controllers/NewEmployeeController.js';

const NewEmployeeRouter = express.Router();

// Route for uploading a new employee
NewEmployeeRouter.post('/newemployee', upload.single('image'), newEmployee);

export default NewEmployeeRouter;
