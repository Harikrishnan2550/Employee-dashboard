import express from 'express' 
import {generatePayroll,viewPayroll} from '../controllers/PayrollController.js'

const payrollrouter=express.Router()

payrollrouter.post('/generate',generatePayroll)

payrollrouter.get('/view/:employee_id',viewPayroll)

export default payrollrouter;