var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var compression = require('compression');
var logger = require('./utils/logger');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = function (db) {
  let ctrl = require('./control/index')(db);

  setConnection();

  setLogRouter(ctrl);

  setParamParser();

  setPublicRouter();

  setAuthRouter();

  setModelRouter(ctrl);

  setErrorHandle();

  return app;
}

function setParamParser() {

  app.param('name', function (req, res, next, foodId) {
    req.paramData = req.paramData || {};
    req.paramData.foodId = foodId;
    next();
  });
  
}

function setPublicRouter() {

  app.get('/', function(req, res) {
    let dir = '../public/views/login-register.html';
    res.sendFile(path.join(__dirname, dir));
  });

  app.get('/login', function(req, res) {
    let dir = '../public/views/login-register.html';
    res.sendFile(path.join(__dirname, dir));
  });

  app.get('/menu', function(req, res) {
    let dir = '../public/views/menu.html';
    res.sendFile(path.join(__dirname, dir));
  });

  app.get('/all-order', function(req, res) {
    let dir = '../public/views/all-order.html';
    res.sendFile(path.join(__dirname, dir));
  });

}

function setAuthRouter() {
  app.get('/*', function(req, res, next) {
    if (!req.session) {
      logger.error("Redis is not start.");
      res.redirect('/login');
    } else if ((req.path.indexOf('/api') == -1) && !req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
  })
}

function setConnection() {
  // 设置中间件
  app.use(compression());

  app.use(express.static(path.join(__dirname, '../public')));

  app.use(function (req, res, next){
    logger.info(`${req.method} : ${req.url}`);
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  let redisOptions = {
    host: 'localhost',
    port: 6379
  }

  app.use(session({
    store: new RedisStore(redisOptions),
    secret: 'Simple Food Store For pml',
    cookie: { maxAge: 60000 }}))
}

function setLogRouter(ctrl) {
  app.post('/login', ctrl.login);
  app.post('/logout', ctrl.logout);
}

function setModelRouter(ctrl) {

  app.get('/api/getCurrentUser', ctrl.getCurrentUser);

  app.get('/api/cuisine_detail/:name', ctrl.getCuisineDetail);

  // create model router

  let firstUpperCase = function (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
  }

  let models = ['user', 'food', 'order'];

  models.forEach((model)=>{
    app.get('/api/' + model, ctrl['find' + firstUpperCase(model)]);
    app.post('/api/' + model, ctrl['create' + firstUpperCase(model)]);
  })
}

function setErrorHandle() {

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
}
