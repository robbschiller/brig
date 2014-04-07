'use strict';

var pass = require('../lib/password');
var assert = require('chai').assert;

describe('pass()', function(){
  it('hashes a string', function(){
    var res = pass('this is a string');
    assert.isString(res);
    assert.equal(res.length, 40);
  });
});

describe('pass()', function(){
  it('hashes a string', function(){
    var res = pass('this is a string aling along');
    assert.isString(res);
    assert.equal(res.length, 40);
  });
});

describe('pass()', function(){
  it('hashes a string', function(){
    var res = pass('');
    assert.isString(res);
    assert.equal(res.length, 40);
  });
});
