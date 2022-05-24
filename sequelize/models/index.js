const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User =require('./User')
const Data =require('./Data')
const Icon =require('./Icon')


const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

const db = {};
db.sequelize = sequelize; 
db.User = User;
db.Data = Data;
db.Icon = Icon;

User.init(sequelize);
Data.init(sequelize);
Icon.init(sequelize);

User.associate(db);
Data.associate(db);
Icon.associate(db);

module.exports = db;