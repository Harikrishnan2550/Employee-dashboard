import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  console.log("Token received:", token); // Log the token to debug

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message); // Log verification error
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = decoded; // Store the decoded token data (like user ID)
    next(); // Proceed to the next middleware or controller
  });
};


export default verifyToken
