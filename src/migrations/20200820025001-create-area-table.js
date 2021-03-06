'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Areas', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    shape: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title field cannot be empty'
        }
      }
    },
    length: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    },
    breadth: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    },
    side: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    },
    lengthA: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    },
    lengthB: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    },
    lengthC: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    },
    radius: {
      type: Sequelize.DOUBLE(255),
      allowNull: true, 
    }, 
    result: {
      type: Sequelize.DOUBLE(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title field cannot be empty'
        }
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Areas')
};
