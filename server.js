var port = 1337;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express(),
    passport = passport();

app.listen(config.port);

module.exports = app;

console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);
