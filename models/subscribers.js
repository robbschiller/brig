'use strict';

var db = require('../lib/db');
var reg = require('../lib/email-reg');
var idgen = require('idgen');
var defaultCb = require('../lib/default-cb');

/**
 *  Create a subscriber
 */

exports.create = function(email, cb) {
  if (!email) return cb('No email address', null);
  if (!reg(email)) return cb('Invalid email address', null);
  this.get(email, function(err, data){
    if (err) return cb(err, null);
    if (data.length) return _update(email, cb);
    if (!data.length) return _create(email, cb);
  });
};

/**
 *  Update
 */
exports.update = function(email, data, cb) {
  if (!email) return cb('No email address', null);
  if (!reg(email)) return cb('Invalid email address', null);
  if (!data) data = {};
  db.subscribers.update({email:email}, {$set:data}, function(err, data){
    if (err) return cb(err, null);
    exports.get(email, cb);
  });
};

/**
 *  Get
 */

exports.get = function(email, cb) {
  if (!email) return cb('No email address', null);
  if (!reg(email)) return cb('Invalid email address', null);
  db.subscribers.find({email:email}, defaultCb(cb));
};

/**
 *  Get many
 */

exports.getMany = function(emails, cb) {
  emails = emails instanceof Array ? emails : [emails];
  emails = emails.filter(function(em){
    return em && reg(em);
  });
  db.subscribers.find({email:{$in:emails}}, defaultCb(cb));
};

/**
 *  Remove
 */

exports.remove = function(email, cb) {
  if (!email) return cb('No email address', null);
  if (!reg(email)) return cb('Invalid email address', null);
  this.update(email, {active:false}, cb);
};

/**
 *  Delete from db
 */

exports.delete = function(email, cb) {
  if (!email) return cb('No email address', null);
  if (!reg(email)) return cb('Invalid email address', null);
  db.subscribers.remove({email:email}, defaultCb(cb));
};

/**
 *  Private create
 */

function _create (email, cb) {
  var sub = {
    email: email,
    id: idgen(32),
    active: true,
    created: new Date().toUTCString()
  };
  db.subscribers.insert(sub, function(err, data){
    if (err) return cb(err, null);
    exports.get(email, cb);
  });
};

/**
 *  Private update
 */

function _update (email, cb) {
  var obj = {updated: new Date().toUTCString()};
  exports.update(email, obj, cb);
};
