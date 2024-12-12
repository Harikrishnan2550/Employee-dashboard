import { check } from 'express-validator';

// Validation middleware
 export  const validateSignup = [
    check("name").notEmpty().withMessage("Name is required."),
    check("email").isEmail().withMessage("Invalid email format."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ];
  
 export const validateLogin = [
    check("email").isEmail().withMessage("Invalid email format."),
    check("password").notEmpty().withMessage("Password is required."),
  ];
  
  // Error handling middleware
  export const  handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  };

 