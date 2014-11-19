'use strict';

var db = require('../lib/db');
var defaultCb = require('../lib/default-cb');
var idgen = require('idgen');

/**
 *  Create a case
 */
exports.create = function(email, cb) {
  if (!email || !emailreg(email))
    return cb('Invalid email to recover account for', null);
  var obj = {
    email: email,
    id: idgen(32),
    created: new Date().toUTCString(),
    resolved: false
  };
  db.forgot.insert(obj, function(err, data){
    if (err) return cb(err, null);
    return cb(null, [obj]);
  });
};

/**
 *  Get the forgot case
 */
exports.get = function(caseId, cb) {
  if (!caseId) return cb('Invalid case id', null);
  var query = { id: caseId };
  db.forgot.find(query, defaultCb(cb));
};

/**
 *  Resolve a forgotten password
 */
exports.resolve = function(caseId, cb) {
  if (!caseId) return cb('Invalid case id', null);
  var query = { id: caseId };
  var update = { $set: { resolved : true } };
  db.forgot.update(query, update, function(err, data){
    if (err) return cb(err, null);
    exports.get(caseId, cb);
  });
};

/**
 *  Delete a case (for testing)
 */
exports.delete = function(caseId, cb) {
  if (!caseId) return cb('Invalid case id', null);
  var query = { id: caseId };
  db.forgot.remove(query, defaultCb(cb));
};
