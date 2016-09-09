var express=require('express');
var path = require('path');


var app = express();

//static routing
var rootPath = path.join(__dirname, '..', '..');
var publicPath = path.join(rootPath, 'public');
app.use(express.static(publicPath));


app.use('/api', require('./routes'));
module.exports = app;