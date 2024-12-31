import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = decoded; // Store the decoded token data (like user ID)
    next(); // Proceed to the next middleware or controller
  });
};

export default verifyToken
