const { DataTypes, Model } = require('sequelize');
const sequelizeDb = require('../utils/sequelize');

class Position extends Model { }

Position.init({
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
},
  {
    sequelize: sequelizeDb,
  }
);

module.exports = Position;
