'use strict';

var authors = require('../models/authors');
var errors = require('../lib/errors');

/**
 *  Create a user
 */

exports.create = function(req, res, next) {
  var author = req.body;
  authors.create(author, function(err, data){
    if (err) errors.fiveOhThree(req, res, err);
    res.locals.user = data[0];
    next();
  });
};

/**
 *  Update a user
 */

exports.update = function(req, res, next) {
  var user = req.body;
  var id = res.session.user;
  authors.update(id, user, function(err, data){
    if (err) return errors.fiveOhThree(req, res, err);
    res.locals.user = data[0];
    next();
  });
};

/**
 *  Get a user
 */

exports.get = function(req, res, next) {
  var user = res.session.user;
  if (!user) return next();
  authors.get(user, function(err, data){
    if (err) return errors.fiveOhThree(req, res, err);
    res.locals.user = data[0];
    next();
  });
};

/**
 *  Get authors for a list
 */

exports.getForList = function(req, res, next) {

};
