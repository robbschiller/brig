'use strict';

var errors = require('../lib/errors');
var assert = require('chai').assert;

var req = {};

var res = {
  send: function(status, str) { },
};

describe('errors#fourOhFour()', function(){
  it('sends a 404 error', function(d){
    res.send = function(status, msg) {
      assert.equal(status, 404);
      assert.equal('Default', msg);
      d();
    };
    errors.fourOhFour(req, res, 'Default');
  });
});

describe('errors#fourOhFour()', function(){
  it('sends a 404 error with default message', function(d){
    res.send = function(status, msg) {
      assert.equal(status, 404);
      assert.isString(msg);
      d();
    };
    errors.fourOhFour(req, res);
  });
});

describe('errors#fiveOhThree()', function(){
  it('sends a 503 error', function(d){
    res.send = function(status, msg) {
      assert.equal(status, 503);
      assert.equal('Default', msg);
      d();
    };
    errors.fiveOhThree(req, res, 'Default');
  });
});

describe('errors#fiveOhThree()', function(){
  it('sends a 503 error with default message', function(d){
    res.send = function(status, msg) {
      assert.equal(status, 503);
      assert.isString(msg);
      d();
    };
    errors.fiveOhThree(req, res, 'Default');
  });
});
