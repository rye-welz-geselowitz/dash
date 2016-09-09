var express=require('express');
var path = require('path');
var session = require('express-session');

var app = express();

//static routing
var rootPath = path.join(__dirname, '..', '..');
var publicPath = path.join(rootPath, 'public');
app.use(express.static(publicPath));

//logging in and signing up
app.use(session({
    secret: 'Optimus Prime is my real dad'
})); //TODO: Move this to a secret file!!!



app.use('/api', require('./routes'));
module.exports = app;