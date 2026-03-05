const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { JWT_SECRET, EXPIRY_TIME } = require('../../config');

class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const hardcodedUsername = 'admin';
      const hardcodedPassword = 'admin';

      if (username === hardcodedUsername && password === hardcodedPassword) {
        // Pass EXPIRY_TIME directly as a string
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: EXPIRY_TIME });
        return res.status(StatusCodes.OK).json({ message: 'Login successful', token });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
