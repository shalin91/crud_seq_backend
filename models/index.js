const db = require("../db");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: "mysql",
});

module.exports = sequelize;
