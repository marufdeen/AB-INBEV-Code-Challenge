/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {   
    firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'First name field cannot be empty'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Last name field cannot be empty'
      }
    }
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password field cannot be empty'
        }
      }
    },  
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Calculation, {
      foreignKey: 'userId'
    });
  };
  return User;
};
