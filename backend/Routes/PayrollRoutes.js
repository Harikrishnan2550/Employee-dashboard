import express from 'express' 
import {generatePayroll,viewAllPayrolls,viewPayroll} from '../controllers/PayrollController.js'

const payrollrouter=express.Router()

payrollrouter.post('/generate',generatePayroll)

payrollrouter.get('/view/:employee_id',viewPayroll)

payrollrouter.get('/view-all',viewAllPayrolls)

export default payrollrouter;