var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var compression = require('compression');
var logger = require('./utils/logger');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


module.exports = function (db) {
  let ctrl = require('./control/index')(db);

  app.use(compression());

  app.use(express.static(path.join(__dirname, '../../public')));

  app.use(function (req, res, next){
    logger.info(`${req.method} : ${req.url}`);
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.get('/', function(req, res) {
    res.end("Just Test");
  });

  let firstUpperCase = function (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
  }

  // create model router

  let models = ['user', 'food', 'order'];
  // let models = ['user'];

  models.forEach((model)=>{
    app.get('/api/' + model, ctrl['find' + firstUpperCase(model)]);
    app.post('/api/' + model, ctrl['create' + firstUpperCase(model)]);
  })

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {

    res.status(err.status || 500);
    res.end('error HTML');
  });

  return app;

}