const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Formato esperado: "Bearer TOKEN"
    const decoded = jwt.verify(token.split(' ')[1], 'secretkey');

    req.user = decoded; // debe traer { id: ... }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;