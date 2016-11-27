var logger = require('../utils/logger');

module.exports = function (db) {
  let user = require('../model/user')(db);
  let food = require('../model/food')(db);
  let order = require('../model/order')(db);
  var interface = {};

  let createFunc = function (table, tableName) {
    return function (req, res) {
      let newOne = req.body;
      table["create" + tableName](newOne).then(()=>{
        res.end('OK');
      }).catch((err)=>{
        res.writeHead(400);
        res.end(err.message);
      });
    }
  } 

  let findFunc = function (table, tableName) {
    return function (req, res) {
      let filter = req.query || {};
      table['find' + tableName](filter).then((arr)=>{
        res.end(arr.toString());
      }).catch((err)=>{
        res.writeHead(400);
        res.end(err.message);
      })
    }
  }

  interface.createUser = createFunc(user, 'User');
  interface.findUser = findFunc(user, 'User');
  interface.createFood = createFunc(food, 'Food');
  interface.findFood = findFunc(food, 'Food');
  interface.createOrder = createFunc(order, 'Order');
  interface.findOrder = findFunc(order, 'Order');

  return interface; 
}
