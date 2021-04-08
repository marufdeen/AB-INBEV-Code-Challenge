/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Calculation = sequelize.define('Calculation', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title field cannot be empty'
        }
      }
    },
    side: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    breadth: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    }, 
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title field cannot be empty'
        }
      }
    },
  }, {});
  Calculation.associate = function (models) { 
    Calculation.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  return Calculation;
};
