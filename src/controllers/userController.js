/* eslint-disable no-return-assign */
const bcrypt = require('bcryptjs') ;
const { User, Calculation } = require('../models') ;
const createToken =  require('../helper/createToken'); 

const saltRounds = 10;

/**
 * @description users controller
 * class users
 */

 class user {
  /**
     * @description signup a user
     * @method register
     * @param {*} req
     * @param {*} res
     */
  static async register(req, res) {
    let createUser;
    const { firstName, lastName,   email, password } = req.body; 
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      createUser = await User.create({
        firstName, 
        lastName, 
        email,
        password: hash, 
      });
      return res.status(201).json({
        message: 'User successfully created',
        token: await createToken(createUser.dataValues)
      });
    });
  }

  /**
     * @description login a user
     * @method login
     * @param {*} req
     * @param {*} res
     */
  static async login(req, res) {
    const {email, password } = req.body;
    const userFound = await User.findOne({
      where: { email }
    });
    if (userFound) {
      await bcrypt.compare(password, userFound.password, (error, result) => {
        if (result) {
          return res.status(200).json({
            message: 'Access granted!',
            token: createToken(userFound)
          });
        }
        return res.status(400).json({
          message: 'Email and password not match!'
        });
      });
    } else {
      return res.status(400).json({
        message: 'Access denied!'
      });
    }
  }

  /**
     * @description fetch all users from users dummy db
     * @method getAllUsers
     * @param {*} req
     * @param {*} res
     */
  static async allUsers(req, res) {
    const allUsers = await User.findAll();
    if (allUsers.length > 0) {
      return res.status(200).json({
        message: 'Success',
        users: allUsers
      });
    }
    return res.status(200).json({
      message: 'No registered user yet!'
    });
  }

  /**
     * @description get single user from users dummy db
     * @method getSingleUser
     * @param {*} req
     * @param {*} res
     */
  static async singleUser(req, res) {
    const userId = parseInt(req.params.userId);
    const userFound = await User.findOne({
      where: { id: userId },
      include: [{
        model: Calculation,
        as: 'Calculations',
      }],
    });
    if (userFound) {
      return res.status(200).json({
        message: 'Success',
        user: userFound
      });
    }
    return res.status(404).json({
      message: 'User not found!'
    });
  }
  /**
     * @description Edit user details
     * @method editDetails
     * @param {*} req
     * @param {*} res
     */
  static async editDetails(req, res) {
    const userId = parseInt(req.decoded.userId);
    const userFound = await User.findOne({
      where: { id: userId }
    });

    if (userFound) {
      await userFound.update({
        firstName: req.body.firstName || userFound.firstName,
        lastName: req.body.lastName || userFound.lastName,
        email: req.body.email || userFound.email
      });
      return res.status(200).json({
        message: 'User updated successfully!',
        userFound
      });
    }
    return res.status(404).json({
      message: 'User not found'
    });
  }
 
 
}
module.exports = user;