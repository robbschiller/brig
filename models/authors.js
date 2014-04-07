'use strict';

var db = require('../lib/db');
var reg = require('../lib/email-reg');
var validator = require('../lib/validate').author;
var idgen = require('idgen');
var defaultCb = require('../lib/default-cb');

/**
 *  Create an author
 */

exports.create = function(data, cb) {
  var author = validator(data);
  if (author.invalid) return cb(author.message || 'Invalid author data', null);
  author.id = idgen(32);
  author.active = true;
  author.created = new Date().toUTCString();
  this.getByEmail(author.email, function(err, data){
    if (err) return cb(err, null);
    if (data.length) return cb('Email already in use', null);
    db.authors.insert(author, function(err, data){
      if (err) return db(err, null);
      exports.get(author.id, cb);
    });
  });
};

/**
 *  Get an author
 */

exports.get = function(id, cb) {
  if (!id) return cb('No id provided to get user', null);
  db.authors.find({id:id}, defaultCb(cb));
};

/**
 *  Get an author by email
 */

exports.getByEmail = function(email, cb) {
  if (!email) return cb('No id provided to get user', null);
  if (!reg(email)) return cb('Invalid email to get user for', null);
  db.authors.find({email:email}, defaultCb(cb));
};

/**
 *  Update an author
 */

exports.update = function(id, data, cb) {
  if (!id) return cb('No id provided to update user', null);
  if (!data) data = {};

  if (data.email) delete data.email;

  db.authors.update({id:id}, {$set:data}, function(err, data){
    if (err) return cb(err, null);
    exports.get(id, cb);
  });
};

/**
 *  Remove an author
 */

exports.remove = function(id, cb) {
  this.update(id, {active:false}, cb);
};

/**
 *  Delete an author
 */

exports.delete = function(id, cb) {
  db.authors.remove({id:id}, defaultCb(cb));
};
