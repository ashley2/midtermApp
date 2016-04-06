'use strict'



var express = require('express');
var router = express.Router();

// var Beer = require('../models/beer');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 499 : 200).send(err || users);
  });
});


module.exports = router;