// require sequelize
const { Sequelize } = require('sequelize');

// make a Sequelize instance to create a new database
const sequelizeDb = new Sequelize(process.env.DATABASE_URL);

// authenticate and log a successful connection, else log the error
sequelizeDb.authenticate()
  .then(console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// export for use elsewhere
module.exports = sequelizeDb;
