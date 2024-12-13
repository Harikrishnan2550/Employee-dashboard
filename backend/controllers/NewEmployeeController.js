import multer from "multer";
import path from "path";
import newEmployeeModal from "../models/AddemployeeModal.js";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images"); // Folder for storing uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}_${uniqueSuffix}`);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

// Controller for adding a new employee
const newEmployee = async (req, res) => {
  try {
    // Ensure image is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const employee = new newEmployeeModal({
      name: req.body.name,
      email: req.body.email,
      employee_id: req.body.employee_id,
      dob: req.body.dob,
      gender: req.body.gender,
      marital_status: req.body.marital_status,
      designation: req.body.designation,
      department: req.body.department,
      salary: req.body.salary,
      password: req.body.password,
      image: req.file ? req.file.filename : null, // Store filename from multer
      role: req.body.role,
    });

    // Save the employee to the database
    await employee.save();
    res.status(201).json({ success: true, employee });
  } catch (error) {
    console.error("Error adding new employee:", error);
    res.status(500).json({ success: false, message: "Failed to add employee", error });
  }
};

// Export both the controller and upload middleware
export { newEmployee, upload };




// http://localhost:4000/api/employee/newemployee


// try {
//     const {
//         name,
//         email,
//         employee_id,
//         dob,
//         gender,
//         marital_status,
//         designation,
//         department,
//         salary,
//         password,
//     } = req.body;

//     // Check for missing fields
//     if (!name || !email || !employee_id || !dob || !gender || !marital_status || !designation || !department || !salary || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     // Check for duplicates
//     const existingEmployee = await newEmployeeModal.findOne({
//         $or: [{ email }, { employee_id }],
//     });
//     if (existingEmployee) {
//         return res.status(400).json({ error: "Employee already exists" });
//     }

//     // Create and save the employee
//     const newEmployee = new newEmployeeModal({
//         name,
//         email,
//         employee_id,
//         dob,
//         gender,
//         marital_status,
//         designation,
//         department,
//         salary,
//         password,
//     });
//     await newEmployee.save();

//     // Send a success response
//     res.status(201).json({ message: "Employee added successfully", employee: newEmployee });

// } catch (error) {
//     console.error("Error adding new employee:", error);
//     if (error.code === 11000) {
//         return res.status(400).json({ error: "Duplicate email or employee_id" });
//     }
//     res.status(500).json({ error: "Internal server error", details: error.message });
// }
// };
