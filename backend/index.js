import express from 'express'
import 'dotenv/config'
import connectDb from './config/Mongodb.js';
import userRouter from './Routes/UserRoutes.js';

const app = express()
connectDb();

const port = 4000;

app.use(express.json())

app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log('success');
    
})
