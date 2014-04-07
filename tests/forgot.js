'use strict';

var assert = require('chai').assert;
var forgot = require('../models/forgot');

var email = 'tjkrus@gmail.com';
var caseObj;

after(function(d){
  forgot.delete(caseObj.id, d);
});

describe('forgot', function(){
  describe('forgot#create()', function(){
    this.timeout(5000);
    it('creates a new forgot case', function(d){
      forgot.create(email, function(err, data){
        assert.isNull(err);
        assert.isArray(data);
        assert.isObject(data[0]);
        assert.isString(data[0].email);
        assert.isString(data[0].id);
        assert.equal(data[0].id.length, 32);
        assert.equal(data[0].resolved, false);
        caseObj = data[0];
        d();
      });
    });
  });
  describe('forgot#get()', function(){
    it('gets a case by the id', function(d){
      forgot.get(caseObj.id, function(err, data){
        assert.isNull(err);
        assert.isObject(data[0]);
        assert.isString(data[0].email);
        assert.isString(data[0].id);
        assert.equal(data[0].id.length, 32);
        assert.equal(data[0].resolved, false);
        d();
      });
    });
  });
  describe('forgot#resolve()', function(){
    it('resolves a forgotten password', function(d){
      forgot.resolve(caseObj.id, function(err, data){
        assert.isNull(err);
        assert.isObject(data[0]);
        assert.isString(data[0].email);
        assert.isString(data[0].id);
        assert.equal(data[0].id.length, 32);
        assert.equal(data[0].resolved, true);
        d();
      });
    });
  });
});
