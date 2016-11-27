var HTTP = require('./HTTP');
var assert = require('assert')

describe('Interfaces', function () {

  // User table
  describe('#UserTable', function() {
    it('Create User should return OK', function (done){
      HTTP.post('/api/user', {username: "huangchaoli", password: "happy", phone: "15521188004", vip: true}).then((message)=>{
        try {
          assert(message == 'OK');
          done();
        } catch (e) {
          done(e);
        }
      }).catch((err)=>{
        done(err);
      })
    });
    it('Find User should return datas', function(done){
      HTTP.get('/api/user', {username: 'huangchaoli'}).then((message)=>{
        done();
      }).catch((err)=>{
        done(err);
      })
    })
  })

  // Food table
  // describe('#FoodTable', function() {
  //   it('Create Food should return OK', function (done) {
      
  //     HTTP.post('/api/food', {username: "huangchaoli", password: "happy", phone: "15521188004", vip: true}).then((message)=>{
  //       try {
  //         assert(message == 'OK');
  //         done();
  //       } catch (e) {
  //         done(e);
  //       }
  //     }).catch((err)=>{
  //       done(err);
  //     })
  //   });
  //   it('Find User should return datas', function(done){
  //     HTTP.get('/api/user', {username: 'huangchaoli'}).then((message)=>{
  //       done();
  //     }).catch((err)=>{
  //       done(err);
  //     })
  //   })
  // })
})
