const { DataTypes, Model } = require('sequelize');
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
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
},
  // pass a connection to the db to the model 
  {
    sequelize: sequelizeDb,
  }
);

// Export the Player class
module.exports = Player;
