'use strict';

var subscribers = require('../models/subscribers.js');
var assert = require('chai').assert;

var email = 'tjkrus@ar.com';
var subscriberObj;

after(function(d){
  subscribers.delete(email, d);
});

describe('subscribers', function(){
  describe('subscribers#create()', function(){
    it('creates a new subscriber', function(d){
      subscribers.create(email, d);
    });
  });
  describe('subscribers#create()', function(){
    it('creates a new subscriber again', function(d){
      subscribers.create(email, d);
    });
  });
  describe('subscribers#create()', function(){
    it('creates a new subscriber yet again', function(d){
      subscribers.create(email, d);
    });
  });
  describe('subscribers#get()', function(){
    it('gets an subscriber', function(d){
      subscribers.get(email, d);
    });
  });
  describe('subscribers#getMany()', function(){
    it('gets subscribers', function(d){
      subscribers.getMany([email], d);
    });
  });
  describe('subscribers#update()', function(){
    it('updates an subscriber', function(d){
      subscribers.update(email, {firstName: 'teej'}, function(err, data){
        assert.isNull(err);
        assert.equal(data[0].firstName, 'teej');
        d();
      });
    });
  });
  describe('subscribers#remove()', function(){
    it('removes an subscriber', function(d){
      subscribers.remove(email, d);
    });
  });
});
