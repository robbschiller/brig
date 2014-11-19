'use strict';

var db = require('../lib/db');
var reg = require('../lib/email-reg');
var validator = require('../lib/validate').user;
var idgen = require('idgen');
var defaultCb = require('../lib/default-cb');

/**
 *  Create a user
 */
exports.create = function(data, cb) {
  var user = validator(data);
  if (user.invalid) return cb(user.message || 'Invalid user data', null);
  user.id = idgen(32);
  user.active = true;
  user.created = new Date().toUTCString();
  this.getByEmail(user.email, function(err, data){
    if (err) return cb(err, null);
    if (data.length) return cb('Email already in use', null);
    db.users.insert(user, function(err, data){
      if (err) return db(err, null);
      exports.get(user.id, cb);
    });
  });
};

/**
 *  Get a user
 */
exports.get = function(id, cb) {
  if (!id) return cb('No id provided to get user', null);
  db.users.find({id:id}, defaultCb(cb));
};

/**
 *  Get a user by email
 */
exports.getByEmail = function(email, cb) {
  if (!email) return cb('No id provided to get user', null);
  if (!reg(email)) return cb('Invalid email to get user for', null);
  db.users.find({email:email}, defaultCb(cb));
};

/**
 *  Update a user
 */
exports.update = function(id, data, cb) {
  if (!id) return cb('No id provided to update user', null);
  if (!data) data = {};

  if (data.email) delete data.email;

  db.users.update({id:id}, {$set:data}, function(err, data){
    if (err) return cb(err, null);
    exports.get(id, cb);
  });
};

/**
 *  Remove a user
 */
exports.remove = function(id, cb) {
  this.update(id, {active:false}, cb);
};

/**
 *  Delete an author
 */
exports.delete = function(id, cb) {
  db.users.remove({id:id}, defaultCb(cb));
};
