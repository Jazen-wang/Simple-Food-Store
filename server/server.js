/*
 * Server Start
 */

var logger = require('./utils/logger');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/foodStore';
var appPort = 8002;

MongoClient.connect(url, function(err, db) {

  if (err) {
    logger.error(`Error when connect mongodb : ${err.message}`);
  } else {

    var app = require('./app')(db);

    app.listen(appPort, function() {
      logger.info(`SimpleFoodStore 开发服务器启动，正在监听端口：${appPort}`);
    });

    process.on('uncaughtException', (err) => logger.error(err));

  }

});



