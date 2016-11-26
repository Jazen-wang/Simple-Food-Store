
var validator = require('../utils/validator');

module.exports = function (db) {
  var interface = {};

  var foodTable = db.collection('food');

  interface.createFood = function (newFood) {
    if (validator.checkOrder(newFood)) {
      return foodTable.insertOne(newFood);
    } else {
      return Promise.reject(new Error('Food is not valid'));
    }
  }

  interface.findFood = function (filter) {
    return new Promise(function (resolve, reject){
      foodTable.find(filter).toArray(function (err, items) {
        if (!err) {
          resolve(items);
        } else {
          reject(err);
        }
      });
    });
  }

  return interface;
}