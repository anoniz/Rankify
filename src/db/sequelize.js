const { Sequelize } = require('sequelize');

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME 


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: '172.17.0.2',
  dialect: 'postgres',
  logging: console.log,
  
});


module.exports = sequelize;