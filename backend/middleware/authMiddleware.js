const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req?.headers?.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = await UserModel.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};


exports.adminOnly = async( req, res, next) => {

  if(!req?.user?.isAdmin) {
    return res.status(403).json({message: 'Forbidden'})

  }

  next();

}