const jwt = require('jsonwebtoken') ; 

const secret = process.env.JWT_KEY;

 const createToken = (userData) => {
  const token = jwt.sign({
    userId: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email, 
  }, secret, {
    expiresIn: '1h'
  });
  return token;
};
module.exports =  createToken;
