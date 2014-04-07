'use strict';

var subs = require('../models/subscriptions');
var assert = require('chai').assert;

var list = 'foo bar list';
var subscriber = 'foo bar sub';

after(function(d){
  subs.delete(list, subscriber, d);
});

describe('subscriptions', function(){
  describe('subs#add()', function(){
    it('adds a subscription record', function(d){
      subs.create(list, subscriber, d);
    });
  });
  describe('subs#get()', function(){
    it('gets the subscribers for a list', function(d){
      subs.get(list, function(err, data){
        assert.isArray(data);
        assert.ok(data.length > 0);
        d();
      });
    });
  });
  describe('subs#remove()', function(){
    it('removes a subscriber from a list', function(d){
      subs.remove(list, subscriber, function(err, data){
        assert.isNull(err);
        assert.isFalse(data[0].active);
        d();
      });
    });
  });
});
