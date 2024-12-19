import jwt from "jsonwebtoken";

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user data to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Role-based Access Control
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Unauthorized role" });
    }
    next();
  };
};

// Signup Validation Middleware
const validateSignup = (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check for required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password strength
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  // Validate role
  const validRoles = ["admin", "hr", "employee"];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: "Invalid role. Must be admin, hr, or employee" });
  }

  next(); // Proceed to the controller
};

export { verifyToken, authorizeRoles, validateSignup };
