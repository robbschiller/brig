'use strict';

var sessions = require('../models/sessions');
var assert = require('chai').assert;

var cookie = 'foo bar cookie';
var user = 'foo bar user';

describe('sessions', function(){
  describe('sessions#set()', function(){
    it('creates a session in the db', function(d){
      sessions.set(cookie, user, d);
    });
  });
  describe('sessions#get()', function(){
    it('gets a session from the db', function(d){
      sessions.get(cookie, function(err, data){
        assert.isNull(err);
        assert.isObject(data);
        d();
      });
    });
  });
  describe('sessions#del()', function(){
    it('deletes a session from the db', function(d){
      sessions.del(cookie, d);
    });
  });
});
