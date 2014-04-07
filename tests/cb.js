'use strict';

var defaultCb = require('../lib/default-cb');
var assert = require('chai').assert;

describe('defaultCb', function(){
  it('asserts the err is null', function(d){
    var fn = defaultCb(function(err, data){
      assert.ok(data);
      assert.isNull(err);
      d();
    });

    fn(null, 'foo bar');
  });
});

describe('defaultCb', function(){
  it('asserts the err is truthy', function(d){
    var fn = defaultCb(function(err, data){
      assert.ok(err);
      assert.isNull(data);
      d();
    });

    fn('foo bar', null);
  });
});
