const { User } = require('../models') ;

 exports.isUserValid = async ({ decoded: { userId } }, res, next) => {
  const userFound = await User.findOne({
    where: { id: userId }
  });
  if (userFound) {
    return next();
  }
  return res.status(404).json({
    message: 'Login First'
  });
}; 