import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const loginUser = async (req,res) =>{
    try{
        const { email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({ success:false,message: "User doesn't exists"})
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(ismatch){
            const token = createToken(user._id);
            res.json({ success:true, token})
        }else{
            res.json({ success:false,message:"invalid credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }

}

export  {loginUser}