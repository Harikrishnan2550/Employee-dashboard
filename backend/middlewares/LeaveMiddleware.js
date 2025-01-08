import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for the Authorization header
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  // Ensure the token follows the Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = {
      employee_id: decoded.id, // Assuming `id` in the payload is the employee ID
      role: decoded.role, // Optional: Include other claims for role-based access
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authenticate;
