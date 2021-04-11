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
      type: DataTypes.DOUBLE,
      allowNull: true, 
    },
    breadth: {
      type: DataTypes.DOUBLE,
      allowNull: true, 
    },
    side: {
      type: DataTypes.DOUBLE,
      allowNull: true, 
    },
    lengthA: {
      type: DataTypes.DOUBLE,
      allowNull: true, 
    },
    lengthB: {
      type: DataTypes.DOUBLE,
      allowNull: true, 
    },
    lengthC: {
      type: DataTypes.DOUBLE,
      allowNull: true, 
    },
    radius: {
      type: DataTypes.DOUBLE,
      allowNull: true, 
    }, 
    result: {
      type: DataTypes.DOUBLE,
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
