// require sequelize
const { Sequelize } = require('sequelize');

// make a Sequelize instance to create a new database
// logging as false removes the SQL logs in the terminal
const sequelizeDb = new Sequelize(process.env.DATABASE_URL, { logging: false });

// authenticate and log a successful connection, else log the error
sequelizeDb.authenticate()
  .then(console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// export for use elsewhere
module.exports = sequelizeDb;
