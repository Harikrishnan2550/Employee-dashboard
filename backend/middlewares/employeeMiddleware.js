import jwt from "jsonwebtoken";

// Middleware to check if the user's role is authorized for a particular action
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    // Extracting the user's role from req.user
    const userRole = req.user?.role;  // Ensure that req.user is defined before accessing the role

    if (!userRole) {
      return res.status(400).json({
        success: false,
        message: "User role is not found in the request.",
      });
    }

    // Checking if the user's role is in the list of allowed roles
    if (!roles.includes(userRole)) {
      // If not, return a 403 Forbidden error
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have the required role.",
      });
    }

    // If the role is authorized, proceed to the next middleware or route handler
    next();
  };
};

// Middleware to authenticate the user based on the JWT token
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Make sure this matches the token secret
      req.user = decoded;  // Attach user details to req
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
  };
  
export { authorizeRoles, authenticateUser };
