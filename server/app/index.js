var express=require('express');
var path = require('path');
var session = require('express-session');
var Company=require('../db/models/company');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

//body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./authentication')(app, db); //not sure if this should be here

//static routing
var rootPath = path.join(__dirname, '..', '..');
var publicPath = path.join(rootPath, 'public');
var browserPath = path.join(rootPath, 'browser');
var npmPath = path.join(rootPath, '/node_modules');

app.use(express.static(publicPath));
app.use(express.static(browserPath));
app.use(express.static(npmPath));


app.get('/me', function (req, res, next) {
    if (!req.user) {
        res.sendStatus(401);
    } else {
        res.send(req.user);
    }

});

app.use('/api', require('./routes'));

app.get('/*', function (req, res) {
    res.sendFile(publicPath+'/index.html');
});

// Catch any errors
app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;