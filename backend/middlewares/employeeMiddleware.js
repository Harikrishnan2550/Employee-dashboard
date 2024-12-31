import jwt from 'jsonwebtoken';

// Middleware to check if the user's role is authorized for a particular action
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(400).json({
        success: false,
        message: 'User role is not found in the request.',
      });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have the required role.',
      });
    }

    next();
  };
};

// Middleware to authenticate the user based on the JWT token
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

export { authorizeRoles, authenticateUser };
