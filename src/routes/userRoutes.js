const express = require('express');
const user = require('../controllers/userController');
const  {verifyToken} = require('../middlewares/verifyToken');
const  {isUserValid }  = require('../middlewares/checkAuth') ;
const { validateSignup, validateSignin, validateEdit } = require('../middlewares/userCredentials');

const router = express.Router();

router.get('/users', user.allUsers);
router.get('/users/:userId', user.singleUser);
router.post('/register', validateSignup, user.register);
router.post('/login', validateSignin, user.login); 
router.patch('/editProfile',[ verifyToken, isUserValid, validateEdit], user.editDetails);

module.exports = router;