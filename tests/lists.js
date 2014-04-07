'use strict';

var lists = require('../models/lists.js');
var assert = require('chai').assert;

var owner = 'foo bar owner';

after(function(d){
  lists.deleteUsersLists(owner, d);
});

describe('lists', function(){
  describe('lists#create()', function(){
    it('creates a list for a user', function(d){
      lists.create(owner, d);
    });
  });
  describe('lists#getByOwner()', function(){
    it('gets a list for an owner', function(d){
      lists.getByOwner(owner, function(err, data){
        assert.isNull(err);
        assert.isArray(data);
        d();
      });
    });
  });
});
