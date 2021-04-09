const { User } = require('../models') ;
const { validName, validEmail } = require('./regEx') ;

const checkEmail = (email) => User.findOne({
  where: { email }
});

/**
 * @description validate user details
 * @class validateDetails
 */
 class validations {
  /**
     * @description validate user details
     * @function signupValidations
     * @param {object} body
     * @returns {Array} signupErrors
     */
  static async signupValidations(body) {
    const { firstName, lastName, email, password, confirmPassword } = body;
    const signupErrors = {};

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      signupErrors.firstName = [];
      signupErrors.firstName.push('First name is required, with at least three alphabetical characters');
    }

    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      signupErrors.lastName = [];
      signupErrors.lastName.push('Last name is required, with at least three alphabetical characters');
    }

    if (!email || !validEmail.test(email)) {
      signupErrors.email = [];
      signupErrors.email.push('Invalid Email Format');
    }

    const emailAlreadyExist = await checkEmail(email);
    if (emailAlreadyExist) {
      signupErrors.email = [];
      signupErrors.email.push('Email already exist');
    }

    if (!password || password.length < 3) {
      signupErrors.password = [];
      signupErrors.password.push('Password is required, with at least three characters');
    }

    if (!confirmPassword || confirmPassword !== password) {
      signupErrors.confirmPassword = [];
      signupErrors.confirmPassword.push('Passwords don\'t match');
    }
    return signupErrors;
  }

  /**
     * @description validate user details
     * @function signinValidations
     * @param {object} body
     * @returns {Array} siginErrors
     */
  static signinValidations(body) {
    const { email, password } = body;
    const siginErrors = {};

    if (!email || !validEmail.test(email)) {
      siginErrors.email = [];
      siginErrors.email.push('Invalid Email Format');
    }

    if (!password || password.length < 2) {
      siginErrors.password = [];
      siginErrors.password.push('Password must be at least three characters');
    }

    return siginErrors;
  }

  /**
     * @description validate user details
     * @function editValidations
     * @param {object} body
     * @returns {Array} editErrors
     */
  static async editValidations(body, userId) { 
    const { firstName, lastName, email } = body;
    const editErrors = [];
    const emailAlreadyExist = await checkEmail(email);

    if (!email || !validEmail.test(email)) {
      editErrors.push({
        Email: 'Invalid Email Format'
      });
    }
    if (emailAlreadyExist.dataValues.email.length > 0 && emailAlreadyExist.dataValues.id !== userId) {
      editErrors.push({
        Email: 'User already exist'
      });
    }

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      editErrors.push({
        firstName: 'First Name must be at least three alphabetical characters'
      });
    }

    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      editErrors.push({
        lastName: 'Last Name must be at least three alphabetical characters'
      });
    }
    return editErrors;
  }
 
}
module.exports = validations;