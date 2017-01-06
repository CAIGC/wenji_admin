var express = require('express');
var router = express.Router();
var userService = require('../services/user_service');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  userService.login(req.body.username,req.body.password,function(data){
    console.info(JSON.parse(data));
  })
});

module.exports = router;
