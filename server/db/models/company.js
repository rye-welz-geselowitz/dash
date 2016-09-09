'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

var Company = db.define('company', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    password: Sequelize.STRING
  }
});

module.exports = Company;