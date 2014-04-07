'use strict';

/**
 *  Default a callback
 */

module.exports = function(cb) {
  return function(err, data){
    if (err) return cb(err, null);
    return cb(null, data);
  };
};
