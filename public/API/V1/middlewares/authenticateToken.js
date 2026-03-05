const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
    }

    req.user = user;  // Attach decoded token data to req.user
    next();
  });
};

module.exports = authenticateToken;
