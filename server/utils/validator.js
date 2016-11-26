var _ = require('lodash');

var interface = {};

interface.checkUser = function (user) {
  if (user) user.vip = user.vip == 'true' ? true : false;
  return _.isObject(user) && _.isString(user.username) && _.isString(user.password) && _.isString(user.phone) && _.isBoolean(user.vip);
}

interface.checkFood = function (food) {
  if (food) food.vip = food.vip == 'true' ? true : false;
  return _.isObject(food) && _.isString(food.foodname) && _.isNumber(food.price - 0) && _.isString(food.description) && _.isBoolean(food.vip);
}

interface.checkOrder = function (order) {
  // TODO : validator.checkOrder
  return true;
}

module.exports = interface;