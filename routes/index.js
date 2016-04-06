'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});


// router.get('/protected', User.authMiddleWare, function(req, res) {
//   console.log('req.user:', req.user);
//   res.send('protected!');
// });

module.exports = router;
