var logger = require('../utils/logger');
var ObjectID = require('mongodb').ObjectID;

module.exports = function (db) {
  let user = require('../model/user')(db);
  let food = require('../model/food')(db);
  let order = require('../model/order')(db);
  var interface = {};

  let sendData = function (res, state, message) {
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
        sendData(res, 200, arr);
      }).catch((err)=>{
        sendData(res, 400, err.message);
      })
    }
  }

  interface.createUser = createFunc(user, 'User');
  interface.findUser = findFunc(user, 'User');
  interface.createOrder = createFunc(order, 'Order');
  interface.findOrder = findFunc(order, 'Order');
  interface.createFood = createFunc(food, 'Food');

  interface.findFood = function (req, res, next) {
    let filter = req.query || {};
    let userVip = false;
    if (req.session && req.session.user) {
      userVip = req.session.user.vip;
    }
    food.findFood(filter).then((arr)=>{
      for (var i = 0; i < arr.length; i++) {
        arr[i].vip = userVip && arr[i].vip;
      }
      sendData(res, 200, arr);
    }).catch((err)=>{
      sendData(res, 400, err.message);
    });
  }

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

  interface.getCurrentUser = function (req, res, next) {
    let currentUser = (req.session && req.session.user) || null;
    if (currentUser) delete currentUser.password;
    sendData(res, 200, currentUser);
  }

  interface.getCuisineDetail = function (req, res, next) {
    if (!req.paramData || !req.paramData.foodId) {
      sendData(res, 400, "no foodname");
    } else {
      let id = null;
      try {
        id = ObjectID(req.paramData.foodId);
      } catch (err) {
        return sendData(res, 400, "foodname is not valid with error : " + err.message);
      }
      food.findFood({"_id": id}).then((arr)=>{
        let userVip = false;
        if (req.session && req.session.user) {
          userVip = req.session.user.vip;
        }
        if (arr.length > 0) {
          arr[0].vip = userVip;
          sendData(res, 200, arr[0]);
        } else {
          sendData(res, 400, "not such a food");
        }
      }).catch((err)=>{
        sendData(res, 400, err.message);
      });
    }
  }

  interface.getOrderById = function (req, res, next) {
    if (!req.paramData || !req.paramData.orderId) {
      sendData(res, 400, "no orderId");
    } else {
      let id = null;
      try {
        id = ObjectID(req.paramData.orderId);
      } catch (err) {
        return sendData(res, 400, "orderId is not valid with error : " + err.message);
      }
      order.findOrder({"_id": id}).then((arr)=>{
        if (arr.length > 0) {
          food.findFood({}).then((foods)=>{
            let foodids = arr[0].foodids;

            for (let i = 0; i < foodids.length; i++) {
              let thisfood = null;
              for (let j = 0; j < foods.length; j++) {
                if (foods[j]._id == foodids[i].foodid) {
                  thisfood = foods[j]; break;
                }
              }
              if (thisfood) {
                thisfood.num = foodids[i].num;
                foodids[i] = thisfood;
              }
            }

            sendData(res, 200, arr[0]);
          }).catch((err)=>{
            sendData(res, 400, err.message);
          });
        } else {
          sendData(res, 400, "not such a order");
        }
      }).catch((err)=>{
        sendData(res, 400, err.message);
      });
    }
  }

  return interface; 
}
