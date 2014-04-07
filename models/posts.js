'use strict';

var db = require('../lib/db');
var reg = require('../lib/email-reg');
var validator = require('../lib/validate').post;
var idgen = require('idgen');
var defaultCb = require('../lib/default-cb');

/**
 *  Create a post
 */

exports.create = function(post, cb) {
  post = validator(post);
  if (!post) return cb('Invalid post to create', null);
  post.id = idgen(32);
  post.created = new Date().toUTCString();
  post.acitve = true;
  db.posts.insert(post, function(err, data){
    if (err) return cb(err, null);
    exports.get(post.id, cb);
  });
};

/**
 *  Get a post
 */

exports.get = function(id, cb) {
  if (!id) return cb('Invalid post to get', null);
  var query = { id: id, };
  db.posts.find(query, defaultCb(cb));
};

/**
 *  Get posts for an author
 */

exports.getForAuthor = function(author, cb) {
  if (!author) return cb('Invalid author to get posts for', null);
  var query = { author: author, };
  db.posts.find(query, defaultCb(cb));
};

/**
 *  Update a post
 */

exports.update = function(id, obj, cb) {
  if (!id) return cb('Invalid post to get', null);
  if (!obj) obj = {};
  var query = { id: id };
  var update = { $set: obj };
  db.posts.update(query, update, function(err, data){
    if (err) return cb(err, null);
    exports.get(id, cb);
  });
};

/**
 *  Delete a post
 */

exports.delete = function(id, cb) {
  if (!id) return cb('Invalid post to delete', null);
  var query = { id: id, };
  db.posts.remove(query, defaultCb(cb));
};
