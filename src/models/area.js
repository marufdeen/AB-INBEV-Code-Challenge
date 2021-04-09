/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
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
    length: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    breadth: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    side: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    lengthA: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    lengthB: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    lengthC: {
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
  Area.associate = function (models) { 
    Area.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  return Area;
};
