'use strict';

var Sequelize = require('sequelize');
var databaseURI = require('../env').DATABASE_URI;

var db = new Sequelize(databaseURI, {logging:false});

module.exports=db;