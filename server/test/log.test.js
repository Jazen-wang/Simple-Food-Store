var HTTP = require('./HTTP');
var assert = require('assert')

describe('Interfaces', function () {

  before(function (done) {
    HTTP.post('/api/user', {username: "huangchaoli", password: "happy", phone: "15521188004", vip: true})
        .then((message)=>{
         assert(message == 'OK');
         done();
        });
  })

  // User table
  describe('#Login', function() {
    it('login user who exist should success', function (){
      return HTTP.post('/login', {username: "huangchaoli", password: "happy"})
                 .then((message)=>{
                   assert(message == 'login success');
                 });
    });
    it('login user who not exist should fails', function (){
      return HTTP.post('/login', {username: "huangchaoli", password: "happy2"})
                 .then((message)=>{
                   console.log(message);
                   assert(message == 'not such a user');
                 });
    });
  })

})
