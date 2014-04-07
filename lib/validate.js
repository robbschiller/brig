'use strict';

var pass = require('./password');
var emailreg = require('./email-reg');

var authorKeys = [
    'name',
    'email',
    'password'
];

var postKeys = [
  'title',
  'body',
  'author'
];

/**
 *  Validate an author
 */

exports.author = function(author) {
  var valid = true;
  var ret = {
    name: author.name,
    phone: author.phone,
    email: author.email,
    password: pass(author.password),
  };

  authorKeys.forEach(function(key){
    if (!ret[key]) valid = false;
  });

  if (!emailreg(author.email)) {
    valid = false;
    author.message = 'Invalid email format';
  };

  if (!valid) ret.invalid = true;

  return ret;
};

/**
 *  Validate a subscriber
 */

exports.subscriber = function(sub) {
  return sub;
};

/**
 *  Validate a post
 */

exports.post = function(post) {
  var valid = true;
  var ret = {
    title: post.title,
    body: post.body,
    author: post.author
  };

  postKeys.forEach(function(key){
    if (!ret[key]) valid = false;
  });

  return !valid ? false : ret;
};
