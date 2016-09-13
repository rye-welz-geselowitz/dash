'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

var Employee = db.define('employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phone: {
    type:Sequelize.STRING,
    validate: {
        is: ['^[0-9]{10,11}$'] //test this
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      is: ['^.+@.+\..+$']
    }
  },
  hireDate: Sequelize.DATE
});

module.exports = Employee;