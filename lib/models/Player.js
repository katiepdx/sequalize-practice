const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizeDb = require('../utils/sequelize');

class Player extends Model { }

// CREATE TABLES in sequelize
// Player is model name - init to "create"
Player.init({
  // table columns
  name: {
    // data type
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  careerGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  teams: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: false
  }
},
  // pass a connection to the db to the model 
  {
    sequelize: sequelizeDb,
  }
);

// Export the Player class
module.exports = Player;
