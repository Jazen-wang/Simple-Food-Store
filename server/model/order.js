
var validator = require('../utils/validator');

module.exports = function (db) {
  var interface = {};

  var orderTable = db.collection('order');

  interface.createOrder = function (newOrder) {
    if (validator.checkOrder(newOrder)) {
      return orderTable.insertOne(newOrder);
    } else {
      return Promise.reject(new Error('Order is not valid'));
    }
  }

  interface.findOrder = function (filter) {
    return new Promise(function (resolve, reject){
      orderTable.find(filter).toArray(function (err, items){
        if (!err) {
          resolve(items);
        } else {
          reject(err);
        }
      });
    })
  }

  return interface;
}