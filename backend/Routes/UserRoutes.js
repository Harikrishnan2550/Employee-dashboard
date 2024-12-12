import express from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'
import {validateLogin,validateSignup,handleValidationErrors} from '../middlewares/userMiddlewares.js'
 
const userRouter = express.Router()

userRouter.post("/login",loginUser,validateLogin,handleValidationErrors)
userRouter.post("/signup",signupUser,validateSignup,handleValidationErrors)

export default userRouter;