'use strict';

var sha1 = require('sha1');

module.exports = function(pass) {
  return sha1(sha1('human'+pass+'so'));
};
