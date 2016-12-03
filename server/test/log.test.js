var HTTP = require('./HTTP');
var assert = require('assert')

describe('Interfaces', function () {

  before(function (done) {
    HTTP.post('/api/user', {username: "huangchaoli", password: "happy", phone: "15521188004", vip: true})
        .then((res)=>{
         assert(res.message == 'OK');
         done();
        });
  })

  // User table
  describe('#Login', function() {
    it('login user who exist should success', function (){
      return HTTP.post('/login', {username: "huangchaoli", password: "happy"})
                 .then((res)=>{
                   assert(res.message == 'login success');
                 });
    });
    it('login user who not exist should fail', function (){
      return HTTP.post('/login', {username: "huangchaoli", password: "happy2"})
                 .then((res)=>{
                   assert(res.message == 'not such a user');
                 });
    });
  })

})
