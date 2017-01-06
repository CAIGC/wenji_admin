var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var seed = Math.random();
  var width = Math.floor(seed*177)+100;
  res.render('login', { title: 'Express',width : width+'px;',seed : seed});
});

router.get('/welcome', function(req, res, next) {
  res.render('layout', {shopName : "caiguocheng" ,adminName : "caigc",env:express().get('env')});
});

module.exports = router;
