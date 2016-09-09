var app = require('express')();
app.use('/api', require('./routes'));
module.exports = app;