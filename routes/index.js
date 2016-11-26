var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  let dir = '../public/views/all-foods.html';
  res.sendFile(path.join(__dirname, dir));

});

module.exports = router;
