'use strict';

var db = require('../lib/db');
var reg = require('../lib/email-reg');
var validator = require('../lib/validate').author;
var idgen = require('idgen');
var defaultCb = require('../lib/default-cb');

/**
 *  Create a list
 */

exports.create = function(owner, cb) {
  if (!owner) return cb('Invalid owner to create list for', null);
  var list = {
    id: idgen(32),
    active: true,
    created: new Date().toUTCString(),
    owner: owner
  };
  db.lists.insert(list, defaultCb(cb));
};

/**
 *  Get a list by the owner
 */

exports.getByOwner = function(owner, cb) {
  if (!owner) return cb('Invalid owner to get list for', null);
  var query = {
    owner: owner,
    active: true
  };
  db.lists.find(query, defaultCb(cb));
};

/**
 *  Deletion for testing
 */

exports.deleteUsersLists = function(owner, cb) {
  var query = {
    owner: owner
  };
  db.lists.remove(query, defaultCb(cb));
};
