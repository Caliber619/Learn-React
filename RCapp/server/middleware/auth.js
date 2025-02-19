const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.isStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied: Student access required' });
  }
  next();
};

exports.isWorker = (req, res, next) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ message: 'Access denied: Worker access required' });
  }
  next();
};

exports.isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied: Manager access required' });
  }
  next();
};