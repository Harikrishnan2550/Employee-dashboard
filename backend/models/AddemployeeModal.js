import mongoose from "mongoose";

const newEmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  employee_id: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  marital_status: { type: String, required: true, enum: ["Single", "Married", "Divorced", "Widowed"] },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 },
  password: { type: String, required: true }, // Should be hashed
  role: { 
    type: String, 
    required: true, 
    enum: ["Admin", "HR", "Employee"], 
    default: "Employee" 
  },
  image: { type: String, required: true },
});

// Use this line to prevent model overwrite during hot reloads in development
const newEmployeeModal = mongoose.models.employee || mongoose.model("employee", newEmployeeSchema);

export default newEmployeeModal;


// import mongoose from "mongoose";
// import bcrypt from 'bcrypt'

// // Define the employee schema
// const newEmployeeSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         message: 'Invalid email format'
//     },
//     employee_id: { type: String, required: true, unique: true },
//     dob: { type: String, required: true },
//     gender: { type: String, required: true },
//     marital_status: { type: String, required: true },
//     designation: { type: String, required: true },
//     department: { type: String, required: true },
//     salary: { type: Number, required: true },
//     password: { type: String, required: true }
// });

// // Hash password before saving to the database
// newEmployeeSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         const hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//     }
//     next();
// });

// // Indexes for performance
// newEmployeeSchema.index({ email: 1 });
// newEmployeeSchema.index({ employee_id: 1 });

// // Create or reuse the model
// const newEmployeeModal = mongoose.models.employee || mongoose.model("employee", newEmployeeSchema);

// export default newEmployeeModal;
