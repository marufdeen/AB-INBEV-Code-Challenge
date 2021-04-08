module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('calculation', {
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
    side: {
      type: Sequelize.INTEGER(255),
      allowNull: true, 
    },
    length: {
      type: Sequelize.INTEGER(255),
      allowNull: true, 
    },
    breadth: {
      type: Sequelize.INTEGER(255),
      allowNull: true, 
    },
    radius: {
      type: Sequelize.INTEGER(255),
      allowNull: true, 
    }, 
    result: {
      type: Sequelize.INTEGER(255),
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('calculation')
};
