var logger = require('../utils/logger');
var validator = require('../utils/validator');

module.exports = function (db) {
  var interface = {};

  var userTable = db.collection('user');

  interface.createUser = function (newUser) {
    if (validator.checkUser(newUser)) {
      return userTable.insertOne(newUser);
    } else {
      return Promise.reject(new Error('user is not valid'));
    }
  }

  interface.findUser = function (filter) {
    return new Promise(function (resolve, reject){
      userTable.find(filter).toArray(function (err, items){
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