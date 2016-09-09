'use strict';

var Sequelize = require('sequelize');
var databaseURI = 'postgres://localhost:5432/dash';

var db = new Sequelize(databaseURI);

module.exports=db;