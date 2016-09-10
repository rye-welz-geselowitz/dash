'use strict';

var app = require('./app');
var db = require('./db');

var port = 1337;
var server = app.listen(port, function (err) {
  if (err) throw err;
  console.log('listening on port', port);
  db.sync()
  .then(function () {
    console.log('postgres server connected');
  });
});

//module.exports = server; //Do I need to export this?
