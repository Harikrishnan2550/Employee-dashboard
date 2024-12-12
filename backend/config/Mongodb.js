import mongoose from "mongoose";

const connectDb = async() =>{
    mongoose.connection.on("connected",()=>{
        console.log("DB connected");
        
    })

    await mongoose.connect(`${process.env.mongodb_url}/employee-dashboard`)
}

export default connectDb