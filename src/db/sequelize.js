const { Sequelize } = require('sequelize');

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME 


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: '172.17.0.2',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 5, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in milliseconds) that a connection can be idle before being released
    idle: 10000 // Maximum time (in milliseconds) that a connection can remain open in the pool
  }   
});


module.exports = sequelize;