import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "hr", "employee"], 
    default: "employee" // Default role is employee
  }
});

 

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmNmZGNlMmVlYjhkYTIyZGQxMjg4NSIsInJvbGUiOiJlbXBsb3llZSIsImlhdCI6MTczNTE5NjE0NCwiZXhwIjoxNzM1MTk5NzQ0fQ.hzD3emiD-I5xj0uHH95YX0vsl3vVpnBQ5bJt7bGELuo