module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }, 
    firstName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name field cannot be empty'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last name field cannot be empty'
        }
      }
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
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
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password field cannot be empty'
        }
      }
    },   
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
