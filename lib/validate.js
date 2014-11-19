'use strict';

var pass = require('./password');
var emailreg = require('./email-reg');

var userKeys = [
  'name',
  'email',
  'password'
];

/**
 *  Validate an author
 */
exports.user = function(user) {
  var valid = true;
  var ret = {
    name: user.name,
    email: user.email,
    password: pass(user.password),
  };

  userKeys.forEach(function(key){
    if (!ret[key]) valid = false;
  });

  if (!emailreg(user.email)) {
    valid = false;
    user.message = 'Invalid email format';
  };

  if (!valid) ret.invalid = true;

  return ret;
};
