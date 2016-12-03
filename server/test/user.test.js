var HTTP = require('./HTTP');
var assert = require('assert')

describe('Interfaces', function () {

  // User table
  describe('#UserTable', function() {
    it('Create User should return OK', function (){
      return HTTP.post('/api/user', {username: "huangchaoli", password: "happy", phone: "15521188004", vip: true})
                 .then((message)=>{
                   assert(message == 'OK');
                 });
    });
    it('Find User should return datas', function(){
      return HTTP.get('/api/user', {username: 'huangchaoli'}).then((message)=>{
        assert(message.length >= 0);
      });
    })
  })

})
