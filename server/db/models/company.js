'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

var Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    },
    password: Sequelize.STRING
  }
});

module.exports = Company;