'use strict';

var db = require('../lib/db');
var reg = require('../lib/email-reg');
var validator = require('../lib/validate').author;
var idgen = require('idgen');
var defaultCb = require('../lib/default-cb');

/**
 *  Create a subscription record
 */

exports.create = function(list, sub, cb) {
  if (!list) return cb('Invalid list to add subscriber to', null);
  if (!sub) return cb('Invalid subscriber to add to list', null);
  var obj = {
    created: new Date().toUTCString(),
    list: list,
    subscriber: sub,
    active: true
  };
  db.subscriptions.insert(obj, defaultCb(cb));
};

/**
 *  Get subscriptions for a list
 */
exports.get = function(list, cb) {
  if (!list) return cb('Invalid list to get subscribers for', null);
  var query = {
    list: list,
    active: true
  };
  db.subscriptions.find(query, defaultCb(cb));
};

/**
 *  Remove a subscription
 */

exports.remove = function(list, sub, cb) {
  if (!list) return cb('Invalid list to remove subscriber from', null);
  if (!sub) return cb('Invalid subscriber to remove from list', null);
  var query = {
    list: list,
    subscriber: sub,
  };
  var obj = { $set: { active: false } };
  db.subscriptions.update(query, obj, function(err, data){
    if (err) return cb(err, null);
    db.subscriptions.find(query, defaultCb(cb));
  });
};

/**
 *  Delete a subscription
 */

exports.delete = function(list, sub, cb) {
  if (!list) return cb('Invalid list to delete subscriber from', null);
  if (!sub) return cb('Invalid subscriber to delete from list', null);
  var query = {
    list: list,
    subscriber: sub,
  };
  db.subscriptions.remove(query, defaultCb(cb));
};
