var logger = require('../utils/logger');

module.exports = function (db) {
  let user = require('../model/user')(db);
  let food = require('../model/food')(db);
  let order = require('../model/order')(db);
  var interface = {};

  let sendData = function (res, state, message) {
    res.writeHead(state);
    let data = {
      state: state,
      message: message
    }
    res.end(JSON.stringify(data));
  }

  let createFunc = function (table, tableName) {
    return function (req, res) {
      let newOne = req.body;
      table["create" + tableName](newOne).then(()=>{
        sendData(res, 200, 'OK');
      }).catch((err)=>{
        sendData(res, 400, err.message);
      });
    }
  } 

  let findFunc = function (table, tableName) {
    return function (req, res) {
      let filter = req.query || {};
      table['find' + tableName](filter).then((arr)=>{
        res.end(arr.toString());
      }).catch((err)=>{
        sendData(res, 400, err.message);
      })
    }
  }

  interface.createUser = createFunc(user, 'User');
  interface.findUser = findFunc(user, 'User');
  interface.createFood = createFunc(food, 'Food');
  interface.findFood = findFunc(food, 'Food');
  interface.createOrder = createFunc(order, 'Order');
  interface.findOrder = findFunc(order, 'Order');


  interface.login = function (req, res, next) {
    var loginUser = req.body;
    if (!loginUser || !loginUser.username || !loginUser.password) {
      sendData(res, 400, 'no username or password');
      return;
    }
    user.findUser(loginUser).then((users) => {
      if (users.length > 0) {
        req.session.user = users[0];
        sendData(res, 200, 'login success');
      } else {
        sendData(res, 400, 'not such a user');
      }
    }).catch((err) => {
      sendData(res, 400, 'something error in mongodb!');
    })
  }

  interface.logout = function (req, res, next) {
    if (req.session) req.session.user = null;
    sendData(res, 200, 'logout success');
  }

  return interface; 
}
