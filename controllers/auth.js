'use strict';

var idgen = require('idgen');
var sessions = require('../models/sessions');
var authors = require('../models/authors');
var pass = require('../lib/password');
var errors = require('../lib/errors');

var cookieObj = {
  maxAge: 365 * 24 * 60 * 60 * 1000,
  path: '/',
  httpOnly: true,
};

/**
 *	Query for the cookie in the sessions collection
 */

exports.get = function() {
  return function(req, res, next) {
    var cookie = req.cookies.human;

    sessions.get(cookie, function(err, data){
      if (err) return errors.fiveOhThree(req, res, err);
      res.session = data || {};
      next();
    });
  };
};

/**
 *	Set a cookie if none
 *	@function setCookie
 */

exports.setCookie = function() {
  return function(req, res, next) {
    var cookie = req.cookies.human;
    cookie = cookie || idgen(32);

    if (!req.cookies.human) {
      res.cookie('human', cookie, cookieObj);
      req.cookies.human = cookie;
    };

    next();
  };
};

/**
 *  Try to log a user in
 */

exports.try = function(req, res, next) {
  if (res.locals.user) return res.redirect('/');
  var email = req.body.email;
  var password = pass(req.body.password);

  authors.getByEmail(email, function(err, data){
    if (err) errors.fiveOhThree(req, res, err);
    res.success = true;
    if (!data.length || password !== data[0].password) res.success = false;
    res.locals.user = data[0];
    next();
  });
};

/**
 *  Put the session in the db
 */

exports.makeSession = function(req, res, next) {
  if (!res.success) return next();
  var id = res.locals.user.id;
  var cookie = req.cookies.human;
  sessions.set(cookie, id, function(err, data){
    if (err) return errors.fiveOhThree(req, res, err);
    next();
  });
};

/**
 *  Remove auth
 */

exports.remove = function(req, res, next) {
  var cookie = req.cookies.human;
  sessions.del(cookie, function(err, data){
    if (err) return errors.fiveOhThree(req, res, err);
    next();
  });
};

/**
 *  Redir if needed
 */

exports.verify = function(path) {
  return function(req, res, next){
    if (res.session.user) return res.redirect(path);
    next();
  };
};

/**
 *  Create auth
 */

exports.auto = function(req, res, next) {
  var id = res.locals.user.id;
  var cookie = req.cookies.human;
  sessions.set(cookie, id, function(err, data){
    if (err) return errors.fiveOhThree(req, res, err);
    next();
  });
};
