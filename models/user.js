'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var moment = require('moment');

const JWT_SECRET = process.env.JWT_SECRET;

var User;

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.statics.authMiddleware = function(req, res, next) {
  var token = req.cookies.authtoken;
  try {
    var payload = jwt.decode(token, JWT_SECRET);
  } catch(err) {
    return res.clearCookie('authtoken').status(401).send('Authentication failed.  Invalid token.');
  }
  if(moment().isAfter(moment.unix(payload.exp))) {
    return res.clearCookie('authtoken').status(401).send('Authentication failed.  Token expired.');
  }
  User.findById(payload.userId).select({password: 0}).exec(function(err, user) {
    if(err || !user) {
      return res.clearCookie('authtoken').status(401).send(err);
    }
    req.user = user;
    next();
  });
};

userSchema.methods.generateToken = function() {
  var payload = {
    userId: this._id,
    iat: Date.now(),
    exp: moment().add(1, 'day').unix()
  };
  var token = jwt.encode(payload, JWT_SECRET);
  return token;
};

userSchema.statics.authenticate = function(userObj, cb) {
  User.findOne({username: userObj.username}, function(err, user) {
    if(err || !user) {
      return cb("Authentication failed.");
    }
    bcrypt.compare(userObj.password, user.password, function(err, isGood) {
      if(err || !isGood) {
        return cb("Authentication failed.");
      }
      user.password = null;
      cb(null, user);
    });
  });
};

userSchema.statics.register = function(userObj, cb) {
  bcrypt.hash(userObj.password, 10, function(err, hash) {
    if(err) {
      return cb(err);
    }
    User.create({
      username: userObj.username,
      password: hash
    }, function(err, user) {
      if(err) {
        cb(err);
      } else {
        user.password = null;
        cb(err, user);
      }
    });
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
