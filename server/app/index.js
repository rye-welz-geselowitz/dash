var express=require('express');
var path = require('path');
var session = require('express-session');
var Company=require('../db/models/company');
var bodyParser = require('body-parser');

var app = express();

//body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static routing
var rootPath = path.join(__dirname, '..', '..');
var publicPath = path.join(rootPath, 'public');
app.use(express.static(publicPath));


app.use('/api', require('./routes'));
module.exports = app;