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
      signupErrors.message = 'First name is required, with at least three alphabetical characters';
    }

    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      signupErrors.message = 'Last name is required, with at least three alphabetical characters';
    }

    if (!email || !validEmail.test(email)) {
      signupErrors.message =  'Invalid Email Format';
    }

    const emailAlreadyExist = await checkEmail(email);
    if (emailAlreadyExist) {
      signupErrors.message = 'Email already exist';
    }

    if (!password || password.length < 3) {
      signupErrors.message = 'Password is required, with at least three characters';
    }

    if (!confirmPassword || confirmPassword !== password) {
      signupErrors.message = 'Passwords don\'t match';
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
      siginErrors.message = 'Invalid Email Format';
    }

    if (!password || password.length < 2) {
      siginErrors.message = 'Password must be at least three characters';
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
    const editErrors = {};
    const emailAlreadyExist = await checkEmail(email);

    if (!email || !validEmail.test(email)) {
      editErrors.message =  'Invalid Email Format';
    }
    if (emailAlreadyExist.dataValues.email.length > 0 && emailAlreadyExist.dataValues.id !== userId) {
      editErrors.message = 'User already exist';
    }

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      editErrors.message = 'First Name must be at least three alphabetical characters';
    }

    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      editErrors.message = 'Last Name must be at least three alphabetical characters';
    }
    return editErrors;
  }
 
}
module.exports = validations;