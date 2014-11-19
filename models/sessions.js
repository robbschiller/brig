'use strict';

var db = require('../lib/db');

/**
 *  Get a session from the db
 */
exports.get = function(cookie, cb) {
  db.sessions.findOne({cookie:cookie}, cb);
};

/**
 *  Set a session in the db
 */
exports.set = function(cookie, user, cb) {
  var obj = {
    user: user,
    cookie: cookie,
    created: new Date().toUTCString()
  };
  db.sessions.insert(obj, cb);
};

/**
 *  Del a session from the db
 */
exports.del = function(cookie, cb) {
  var obj = { cookie: cookie };
  db.sessions.remove(obj, cb);
};
